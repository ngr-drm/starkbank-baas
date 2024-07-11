import path from 'node:path';
import { pgPool } from './connector';
import fs from 'fs';

(async function migrate() {
  const client = await pgPool().connect();
  try {
    const pathWithSqlFiles = path.join(__dirname, '/migrations');
    const fileNames = fs
      .readdirSync(pathWithSqlFiles, { withFileTypes: true })
      .filter((item) => !item.isDirectory() && item.name.toLowerCase().endsWith('.sql'))
      .map((item) => item.name);

    await client.query('BEGIN');
    for (const fileName of fileNames) {
      const sql = fs.readFileSync(`${pathWithSqlFiles}/${fileName}`, 'utf8');
      await client.query(sql);
    }

    await client.query('COMMIT');
    console.log('migration done!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('migration failed: ', error);
  } finally {
    client.release(true);
  }
})();
