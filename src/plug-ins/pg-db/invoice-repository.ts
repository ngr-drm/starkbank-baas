import { Invoices } from '../../lib/domain/value-objects';
import { pgPool } from './connector';

async function dbConn() {
  return await pgPool().connect();
}

export async function save(invoice: Invoices) {
  const client = await dbConn();

  const query = {
    text: `INSERT INTO invoices ("name", "taxId", "amount", "status", "invoiceId")
      values($1, $2, $3, $4, $5)`,
    values: [invoice.name, invoice.taxId, invoice.amount, invoice.status, invoice.invoiceId],
  };
  try {
    await client.query(query);
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

export async function update(invoice: Partial<Invoices>) {
  const client = await dbConn();

  const query = {
    text: `UPDATE invoices SET status = $1
    WHERE "invoiceId" = $2;`,
    values: [invoice.status, invoice.invoiceId],
  };
  try {
    await client.query(query);
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}
