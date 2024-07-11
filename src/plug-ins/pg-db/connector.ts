import pg from 'pg';
import { vars } from '../../env-vars';

const { Pool } = pg;

export function pgPool() {
  return new Pool({
    user: vars.DB_USER,
    password: vars.DB_PASSWORD,
    host: vars.DB_HOST,
    database: vars.DB_DATABASE,
    port: vars.DB_PORT,
  });
}
