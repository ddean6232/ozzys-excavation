type IntakeType = 'quote' | 'septic-assessment'

type Env = {
  OZZY_INTAKE_SUBMISSIONS?: KVNamespace
  OZZY_INTAKE_DB: D1Database
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
    .bind(
      `erp:${id}`,
      id,
      type === 'septic-assessment' ? 'Septic Site Assessment Request' : 'Quotation Request',
      'pending',
      1,
      now,
      safeJsonStringify(record),
    )
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

  return jsonResponse({ ok: true, id, status: 'received', storage: 'd1' }, 201)
}

export const onRequestGet: PagesFunction<Env> = async () => {
  return jsonResponse({ ok: true, endpoint: 'Ozzy intake', accepts: Array.from(allowedTypes) })
}
