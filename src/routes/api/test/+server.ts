import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';

export async function GET() {
  const data = await db.select().from(users);
  return new Response(JSON.stringify(data));
}