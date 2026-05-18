import { db } from '$lib/server/db';
import { absensi } from '$lib/server/schema';
import { eq, and } from 'drizzle-orm';

export async function GET({ cookies }) {
  const userId = cookies.get('user_id');

  if (!userId) {
    return new Response(JSON.stringify({}));
  }

  const today = new Date().toISOString().split('T')[0];

  const data = await db
    .select()
    .from(absensi)
    .where(
      and(
        eq(absensi.userId, Number(userId)),
        eq(absensi.tanggal, today)
      )
    );

  return new Response(JSON.stringify({
    absenHariIni: data[0] || null
  }));
}