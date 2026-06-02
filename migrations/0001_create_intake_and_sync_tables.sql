-- D1 schema for Ozzy's Excavation intake buffering and ERPNext sync tracking.

CREATE TABLE IF NOT EXISTS intake_submissions (
  id TEXT PRIMARY KEY,
  intake_type TEXT NOT NULL CHECK (intake_type IN ('quote', 'septic-assessment')),
  status TEXT NOT NULL DEFAULT 'received',
  received_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  source_url TEXT,
  user_agent TEXT,
  ip_address TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  form_json TEXT NOT NULL,
  erp_doctype TEXT,
  erp_docname TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_intake_submissions_type_received_at
  ON intake_submissions (intake_type, received_at DESC);

CREATE INDEX IF NOT EXISTS idx_intake_submissions_status_received_at
  ON intake_submissions (status, received_at DESC);

CREATE INDEX IF NOT EXISTS idx_intake_submissions_contact_email
  ON intake_submissions (contact_email);

CREATE INDEX IF NOT EXISTS idx_intake_submissions_contact_phone
  ON intake_submissions (contact_phone);

CREATE TABLE IF NOT EXISTS erp_sync_attempts (
  id TEXT PRIMARY KEY,
  intake_submission_id TEXT NOT NULL,
  target_system TEXT NOT NULL DEFAULT 'erpnext',
  target_doctype TEXT,
  target_docname TEXT,
  sync_status TEXT NOT NULL CHECK (sync_status IN ('pending', 'success', 'failed', 'skipped')),
  attempt_number INTEGER NOT NULL DEFAULT 1,
  requested_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  completed_at TEXT,
  request_json TEXT,
  response_status INTEGER,
  response_json TEXT,
  error_message TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (intake_submission_id) REFERENCES intake_submissions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_erp_sync_attempts_intake_submission_id
  ON erp_sync_attempts (intake_submission_id);

CREATE INDEX IF NOT EXISTS idx_erp_sync_attempts_sync_status_requested_at
  ON erp_sync_attempts (sync_status, requested_at DESC);

CREATE INDEX IF NOT EXISTS idx_erp_sync_attempts_target_doc
  ON erp_sync_attempts (target_system, target_doctype, target_docname);
