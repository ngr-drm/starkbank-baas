import { vars } from '../../../env-vars';
import { customers } from './sample-bucket/customers-sample.json';
import { createInvoice, newInvoiceInstance } from '../../../plug-ins/stark-client/receivables/invoice';
import { Invoice, Transfer, invoice } from 'starkbank';
import { save, update } from '../../../plug-ins/pg-db/invoice-repository';
import { query } from '../../../plug-ins/stark-client/events/list';
import { newTransferInstance, createTransfer } from '../../../plug-ins/stark-client/bill-payments/transfers';

const AMOUNT_SAMPLE = 3000;
const EVENT_LIMIT = 12;

export function generateRandomNumberOfInvoices() {
  const partialValue = Math.random() * (vars.MAX_NUMBER_INVOICE - vars.MIN_NUMBER_INVOICE) + vars.MIN_NUMBER_INVOICE;
  const finalValue = Number(partialValue.toFixed(0));
  return finalValue;
}

export function getRandomCustomer() {
  const sample = customers;
  const random = Math.floor(Math.random() * sample.length);
  return sample[random];
}

async function saveInvoices(invoices: Invoice[]) {
  for (const invoice of invoices) {
    await save({ name: invoice.name, taxId: invoice.taxId, amount: invoice.amount, status: invoice.status, invoiceId: invoice.id });
  }
}
async function updateInvoices(invoice: Partial<Invoice>) {
  await update({ status: invoice?.status, invoiceId: invoice?.id });
}

export async function invoiceBatchWorker() {
  const numberOfInvoices = generateRandomNumberOfInvoices();
  const invoices: Invoice[] = [];

  for (let i = 0; i < numberOfInvoices; i++) {
    const customer = getRandomCustomer();
    const invoice = newInvoiceInstance(AMOUNT_SAMPLE, customer.taxId, customer.name);
    invoices.push(invoice);
  }

  try {
    const result = await createInvoice(invoices);
    if (result) await saveInvoices(result);
  } catch (err) {
    console.error('an error occurred...', err);
  }
}

export async function listLogEvents(isDelivered: boolean) {
  try {
    const events = await query({ limit: EVENT_LIMIT, isDelivered: isDelivered });
    const invoiceEvents = [];

    for await (let event of events) {
      if (event.subscription === 'invoice') {
        const log = event.log as invoice.Log;
        if (log.invoice.status === 'credited') {
          invoiceEvents.push(log.invoice);
          await updateInvoices({ status: log.invoice.status, id: log.invoice.id });
        }
      }
    }
    return invoiceEvents;
  } catch (err) {
    console.error('an error occurred...', err);
  }
}

export async function creditTransferWorker(forEventsDelivered: boolean) {
  try {
    const invoiceEvents = await listLogEvents(forEventsDelivered);
    const transfers: Transfer[] = [];
    if (!invoiceEvents) {
      throw new Error('no events were found...');
    }
    for (const event of invoiceEvents) {
      const transfer = newTransferInstance({ amount: event.amount as number, name: vars.NAME, taxId: vars.TAX_ID, bankCode: vars.BANK_CODE, branchCode: vars.BRANCH, accountNumber: vars.ACCOUNT, accountType: vars.ACCOUNT_TYPE });
      transfers.push(transfer);
    }
    await createTransfer(transfers);
  } catch (err) {
    console.warn('possible API failure when creating batch transfers...');
    console.error('error details...', err);
  }
}
