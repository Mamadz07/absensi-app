import { db } from '$lib/server/db';
import { absensi, users } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const data = await db
      .select({
        nama: users.nama,
        tanggal: absensi.tanggal,
        checkIn: absensi.checkin,
        checkOut: absensi.checkout,
        status: absensi.status
      })
      .from(absensi)
      .leftJoin(users, eq(users.id, absensi.userId));

    return new Response(JSON.stringify({
      success: true,
      data
    }));

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({
      success: false
    }));
  }
}