import { project } from '../project';
import starkbank, { Transfer } from 'starkbank';

export function newTransferInstance(params: { amount: number; name: string; taxId: string; bankCode: string; branchCode: string; accountNumber: string }) {
  return new Transfer({
    ...params,
  });
}

export async function create(batch: starkbank.Transfer[]) {
  try {
    if (batch.length > 100) {
      throw new Error('it is not possible to create 100 new invoices at once');
    }
    return await starkbank.transfer.create(batch, { user: project });
  } catch (err) {
    throw err;
  }
}
