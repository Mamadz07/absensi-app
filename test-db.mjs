import { createClient } from "@libsql/client";
import 'dotenv/config';

const db = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
});

const result = await db.execute("SELECT 1");

console.log(result);