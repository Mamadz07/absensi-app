import 'dotenv/config';

console.log('URL:', process.env.DATABASE_URL);
console.log('TOKEN:', process.env.TURSO_AUTH_TOKEN);

import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

const result = await db.execute('SELECT 1');

console.log(result);