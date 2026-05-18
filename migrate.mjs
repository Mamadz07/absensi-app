import { createClient } from "@libsql/client";
import fs from "fs";
import 'dotenv/config';

const db = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
});

const sql = fs.readFileSync(
  "./drizzle/0000_regular_mandroid.sql",
  "utf8"
);

await db.executeMultiple(sql);

console.log("Migration success");