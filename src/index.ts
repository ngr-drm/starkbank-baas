import Fastify from 'fastify';
import { pgPool } from './plug-ins/pg-db/connector';
import routes from './lib/gateway';
import { vars } from './env-vars';

(async function run() {
  const fastify = Fastify({ logger: true });

  try {
    const client = await pgPool().connect();
    client.release(true);
    fastify.log.info('successful database connection...');
  } catch (error) {
    fastify.log.error('database connection failure...');
    process.exit(1);
  }

  await fastify.register(routes);

  fastify.listen({ port: vars.API_PORT, host: '0.0.0.0' }, function (error, address) {
    if (error) {
      fastify.log.error(error);
      process.exit(1);
    }
  });
})();
