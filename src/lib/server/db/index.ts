import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL belum diisi');
}

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

export const db = drizzle(client);