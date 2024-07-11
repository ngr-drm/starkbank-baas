CREATE TABLE IF NOT EXISTS invoices (
  "name" TEXT NOT NULL,
  "taxId" TEXT NOT NULL,
  "amount" NUMERIC NOT NULL,
  "status" TEXT NOT NULL,
  "invoiceId" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updateAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS transfers (
  "name" TEXT NOT NULL,
  "taxId" TEXT NOT NULL,
  "transferId" TEXT NOT NULL,
  "externalId" TEXT NOT NULL,
  "amount" NUMERIC NOT NULL,
  "status" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updateAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)




