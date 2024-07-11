import cron from 'node-cron';
import { invoiceBatchWorker } from './fixtures';

const INVOICE_CRON_JOB_EXPRESSION = '0 0,3,6,9,12,15,18,21,23 * * *';
const CREDIT_CRON_JOB_EXPRESSION = '0 */1 * * *';
const test = '*/1 * * * *';

export async function invoiceBatch(toggle: boolean) {
  const task = cron.schedule(
    test,
    async () => {
      await invoiceBatchWorker();
    },
    {
      scheduled: false,
      timezone: 'America/Sao_Paulo',
    }
  );

  if (toggle) {
    console.info('starting invoices routine...');
    task.start();
    return;
  }
  console.info('stoping invoices routine...');
  task.stop();
}

export async function creditTransfer(toggle: boolean) {
  const task = cron.schedule(
    test,
    async () => {
      // await generateBatchOfInvoices();
    },
    {
      scheduled: false,
      timezone: 'America/Sao_Paulo',
    }
  );

  if (toggle) {
    console.info('starting credit transfer routine...');
    task.start();
    return;
  }
  console.info('stoping credit transfer routine...');
  task.stop();
}
