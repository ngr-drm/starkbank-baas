import cron from 'node-cron';
import { invoiceBatchWorker, creditTransferWorker } from './fixtures';
import { vars } from '../../../env-vars';

export async function invoiceBatch(toggle: boolean) {
  const task = cron.schedule(
    vars.INVOICE_CRON_JOB_EXPRESSION,
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
    vars.CREDIT_CRON_JOB_EXPRESSION,
    async () => {
      await creditTransferWorker(true); // para eventos entregues ao webhook
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
