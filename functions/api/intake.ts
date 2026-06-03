type IntakeType = 'quote' | 'septic-assessment'

type Env = {
  OZZY_INTAKE_SUBMISSIONS?: KVNamespace
  OZZY_INTAKE_DB: D1Database
  ERPNEXT_BASE_URL?: string
  ERPNEXT_API_KEY?: string
  ERPNEXT_API_SECRET?: string
}

const allowedTypes = new Set<IntakeType>(['quote', 'septic-assessment'])

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

function getClientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || ''
}

function sanitizeString(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, 4000)
}

function safeJsonStringify(value: unknown): string {
  try {
    return JSON.stringify(value)
  } catch {
    return JSON.stringify({ error: 'Unable to serialize form payload.' })
  }
}

function targetDoctype(type: IntakeType): string {
  return type === 'septic-assessment' ? 'Septic Site Assessment Request' : 'Website Quote Request'
}

function submittedAt(form: Record<string, unknown>, fallback: string): string {
  return sanitizeString(form.submittedAt || form.submitted_at) || fallback
}

function erpPayload(type: IntakeType, record: {
  id: string
  status: string
  receivedAt: string
  source: { url: string; userAgent: string; ip: string }
  contact: { name: string; email: string; phone: string }
  form: Record<string, unknown>
}) {
  const form = record.form
  const firstName = sanitizeString(form.firstName || form.first_name || record.contact.name.split(' ')[0])
  const lastName = sanitizeString(form.lastName || form.last_name || record.contact.name.split(' ').slice(1).join(' '))
  const fullName = sanitizeString(form.fullName || form.name || `${firstName} ${lastName}`.trim()) || record.contact.name || 'Website Lead'
  const common = {
    d1_submission_id: record.id,
    status: 'Received',
    source_url: record.source.url,
    submitted_at: submittedAt(form, record.receivedAt),
    received_at: record.receivedAt,
    ip_address: record.source.ip,
    user_agent: record.source.userAgent,
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    email: record.contact.email,
    phone: record.contact.phone,
    raw_json: safeJsonStringify(form),
  }

  if (type === 'quote') {
    return {
      ...common,
      service_scope: sanitizeString(form.serviceScope || form.scope),
      services_text: sanitizeString(form.materialsIncluded || form.services || form.scope),
      area_dimensions: sanitizeString(form.areaDimensions),
      time_frame: sanitizeString(form.timeFrame),
      ordering_text: sanitizeString(form.ordering || form.serviceOrdering || form.howToOrder),
      site_address: sanitizeString(form.siteAddress),
      budget: sanitizeString(form.budget),
      contact_source: sanitizeString(form.contactSource || form.source),
      message: sanitizeString(form.message),
    }
  }

  const assessment = (form.assessment && typeof form.assessment === 'object' && !Array.isArray(form.assessment)
    ? form.assessment
    : form) as Record<string, unknown>
  return {
    ...common,
    property_address: sanitizeString(assessment.address || form.address),
    requirements: sanitizeString(assessment.requirements || form.requirements),
    house_size: sanitizeString(assessment.houseSize || form.houseSize),
    occupants: sanitizeString(assessment.occupants || form.occupants),
    occupant_notes: sanitizeString(assessment.occupantNotes || form.occupantNotes),
    bedrooms: sanitizeString(assessment.bedrooms || form.bedrooms),
    bathrooms: sanitizeString(assessment.bathrooms || form.bathrooms),
    products: sanitizeString(assessment.products || form.products),
    water_fixtures: sanitizeString(assessment.waterFixtures || form.waterFixtures),
    water_source: sanitizeString(assessment.waterSource || form.waterSource),
    neighbouring_wells: sanitizeString(assessment.neighbouringWells || form.neighbouringWells),
    covenants: sanitizeString(assessment.covenants || form.covenants),
    hobbies: sanitizeString(assessment.hobbies || form.hobbies),
    lifestyle: sanitizeString(assessment.lifestyle || form.lifestyle),
    other_buildings: sanitizeString(assessment.otherBuildings || form.otherBuildings),
    home_business: sanitizeString(assessment.homeBusiness || form.homeBusiness),
    comments: sanitizeString(assessment.comments || form.comments),
    acknowledgement: sanitizeString(assessment.acknowledgement || form.acknowledgement),
  }
}

async function syncToErpNext(env: Env, type: IntakeType, record: Parameters<typeof erpPayload>[1], attemptId: string): Promise<{ ok: boolean; doctype?: string; docname?: string; error?: string; status?: number; response?: unknown }> {
  if (!env.ERPNEXT_BASE_URL || !env.ERPNEXT_API_KEY || !env.ERPNEXT_API_SECRET) {
    return { ok: false, error: 'ERPNext credentials are not configured.' }
  }

  const doctype = targetDoctype(type)
  const url = `${env.ERPNEXT_BASE_URL.replace(/\/$/, '')}/api/resource/${encodeURIComponent(doctype)}`
  const body = erpPayload(type, record)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `token ${env.ERPNEXT_API_KEY}:${env.ERPNEXT_API_SECRET}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  const responseText = await response.text()
  let responseBody: unknown = responseText
  try {
    responseBody = responseText ? JSON.parse(responseText) : null
  } catch {
    responseBody = responseText
  }

  if (!response.ok) {
    const message = typeof responseBody === 'string' ? responseBody : safeJsonStringify(responseBody)
    await env.OZZY_INTAKE_DB.prepare(
      `UPDATE erp_sync_attempts SET sync_status = 'failed', completed_at = ?, response_status = ?, response_json = ?, error_message = ? WHERE id = ?`,
    )
      .bind(new Date().toISOString(), response.status, safeJsonStringify(responseBody), message.slice(0, 4000), attemptId)
      .run()
    return { ok: false, doctype, status: response.status, response: responseBody, error: message }
  }

  const data = responseBody as { data?: { name?: string } }
  const docname = sanitizeString(data?.data?.name)
  await env.OZZY_INTAKE_DB.batch([
    env.OZZY_INTAKE_DB.prepare(
      `UPDATE intake_submissions SET status = 'synced', erp_doctype = ?, erp_docname = ?, updated_at = ? WHERE id = ?`,
    ).bind(doctype, docname, new Date().toISOString(), record.id),
    env.OZZY_INTAKE_DB.prepare(
      `UPDATE erp_sync_attempts SET sync_status = 'success', target_docname = ?, completed_at = ?, response_status = ?, response_json = ? WHERE id = ?`,
    ).bind(docname, new Date().toISOString(), response.status, safeJsonStringify(responseBody), attemptId),
  ])

  return { ok: true, doctype, docname, status: response.status }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: Record<string, unknown>

  try {
    payload = await request.json()
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid JSON payload.' }, 400)
  }

  const type = sanitizeString(payload.type) as IntakeType
  const form = payload.form

  if (!allowedTypes.has(type)) {
    return jsonResponse({ ok: false, error: 'Invalid intake type.' }, 400)
  }

  if (!form || typeof form !== 'object' || Array.isArray(form)) {
    return jsonResponse({ ok: false, error: 'Missing form object.' }, 400)
  }

  const formRecord = form as Record<string, unknown>
  const name = sanitizeString(formRecord.name || formRecord.fullName || formRecord.full_name)
  const email = sanitizeString(formRecord.email)
  const phone = sanitizeString(formRecord.phone)

  if (!name && !email && !phone) {
    return jsonResponse({ ok: false, error: 'At least one contact field is required.' }, 400)
  }

  const now = new Date().toISOString()
  const id = `${type}:${now}:${crypto.randomUUID()}`
  const attemptId = `erp:${id}`
  const record = {
    id,
    type,
    status: 'received',
    receivedAt: now,
    source: {
      url: sanitizeString(payload.sourceUrl) || request.headers.get('Referer') || '',
      userAgent: request.headers.get('User-Agent') || '',
      ip: getClientIp(request),
    },
    contact: { name, email, phone },
    form: formRecord,
  }

  await env.OZZY_INTAKE_DB.prepare(
    `INSERT INTO intake_submissions (
      id,
      intake_type,
      status,
      received_at,
      source_url,
      user_agent,
      ip_address,
      contact_name,
      contact_email,
      contact_phone,
      form_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      type,
      'received',
      now,
      record.source.url,
      record.source.userAgent,
      record.source.ip,
      name,
      email,
      phone,
      safeJsonStringify(formRecord),
    )
    .run()

  await env.OZZY_INTAKE_DB.prepare(
    `INSERT INTO erp_sync_attempts (
      id,
      intake_submission_id,
      target_doctype,
      sync_status,
      attempt_number,
      requested_at,
      request_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(attemptId, id, targetDoctype(type), 'pending', 1, now, safeJsonStringify(record))
    .run()

  if (env.OZZY_INTAKE_SUBMISSIONS) {
    await env.OZZY_INTAKE_SUBMISSIONS.put(id, JSON.stringify(record), {
      metadata: {
        type,
        status: 'received',
        receivedAt: now,
        email,
        phone,
        storage: 'd1',
      },
    })
  }

  const sync = await syncToErpNext(env, type, record, attemptId)

  return jsonResponse(
    {
      ok: true,
      id,
      status: sync.ok ? 'synced' : 'received',
      storage: 'd1',
      erp: sync.ok ? { ok: true, doctype: sync.doctype, docname: sync.docname } : sync.error ? { ok: false, queued: false, error: sync.error, status: sync.status } : { ok: false, queued: true },
    },
    201,
  )
}

export const onRequestGet: PagesFunction<Env> = async () => {
  return jsonResponse({ ok: true, endpoint: 'Ozzy intake', accepts: Array.from(allowedTypes) })
}
