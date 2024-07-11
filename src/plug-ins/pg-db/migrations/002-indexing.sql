CREATE INDEX IF NOT EXISTS tax_id_index ON invoices("taxId");
CREATE INDEX IF NOT EXISTS status_index ON invoices("invoiceId");

CREATE INDEX IF NOT EXISTS tax_id_index ON transfers("taxId");
CREATE INDEX IF NOT EXISTS external_id_index ON transfers("externalId");
CREATE INDEX IF NOT EXISTS transfer_id_index ON transfers("transferId");
