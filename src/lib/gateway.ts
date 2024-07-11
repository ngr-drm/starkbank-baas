import { FastifyRequest, FastifyReply } from 'fastify';
import { creditTransfer, invoiceBatch } from './domain/invoices/routines';
import { listLogEvents } from './domain/invoices/fixtures';
import { Feature } from './domain/value-objects';

async function routes(fastify: any) {
  fastify.post('/invoices/routines/batch', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      //const feature = request.body as Feature;
      //await invoiceBatch(feature.toggle);

      await listLogEvents(true);

      reply.log.info('worker called successfully...');
      return reply.code(201).send();
    } catch (error) {
      reply.log.error(error);
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });
  fastify.post('/invoices/routines/credit-transfer', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const feature = request.body as Feature;
      await creditTransfer(feature.toggle);

      reply.log.info('scheduler called successfully...');
      return reply.code(201).send();
    } catch (error) {
      reply.log.error(error);
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });
}

export default routes;
