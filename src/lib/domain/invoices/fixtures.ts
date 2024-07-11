import { vars } from '../../../env-vars';
import { customers } from './sample-bucket/customers-sample.json';
import { create, newInvoiceInstance } from '../../../plug-ins/stark-client/receivables/invoice';
import { Invoice } from 'starkbank';
import { save } from '../../../plug-ins/pg-db/repository';
import { query } from '../../../plug-ins/stark-client/events/list';

const AMOUNT_SAMPLE = 3000;
const EVENT_LIMIT = 12;

function generateRandomNumberOfInvoices() {
  const partialValue = Math.random() * (vars.MAX_NUMBER_INVOICE - vars.MIN_NUMBER_INVOICE) + vars.MIN_NUMBER_INVOICE;
  const finalValue = Number(partialValue.toFixed(0));
  return finalValue;
}

function getRandomCustomer() {
  const sample = customers;
  const random = Math.floor(Math.random() * sample.length);
  return sample[random];
}

async function saveInvoices(invoices: Invoice[]) {
  for (const invoice of invoices) {
    await save({ name: invoice.name, taxId: invoice.taxId, amount: invoice.amount, status: invoice.status, invoiceId: invoice.id });
  }
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
    const result = await create(invoices);
    if (result) await saveInvoices(result);
  } catch (err) {
    console.error('an error occurred...', err);
  }
}

export async function listLogEvents(isDelivered: boolean) {
  try {
    const events = await query({ limit: EVENT_LIMIT, isDelivered: isDelivered });
    const log = [];
    for await (const event of events) {
      if (event.subscription === 'invoice') {
        log.push(event.log);
      }
    }
    return log;
  } catch (err) {
    console.error('an error occurred...', err);
  }
}

export async function transferBatchGenerator() {
  // filtrar type "credited" e efetuar transferencia;
  // atualizar status da fatura na base;
  // criar registro de transferencia na base;
  // criar repositório
  // fazer mais alguns testes de unidade;
  // escrever Readme e xauuu
}
