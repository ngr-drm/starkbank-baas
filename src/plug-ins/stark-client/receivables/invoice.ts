import { project } from '../project';
import starkbank, { Invoice } from 'starkbank';

export function newInvoiceInstance(amount: number, taxId: string, name: string) {
  return new Invoice({
    amount: amount,
    taxId: taxId,
    name: name,
  });
}
export async function createInvoice(batch: starkbank.Invoice[]) {
  try {
    if (batch.length > 100) {
      throw new Error('it is not possible to create 100 new invoices at once');
    }
    return await starkbank.invoice.create(batch, { user: project });
  } catch (err) {
    throw err;
  }
}
