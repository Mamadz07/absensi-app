import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { absensi } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {

  try {

    const body = await request.json();

    const {
      userId,
      nama,
      status,
      keterangan
    } = body;


    const today = new Date()
      .toISOString()
      .split('T')[0];

    const now = new Date()
      .toLocaleTimeString('id-ID');

    await db.insert(absensi).values({
      userId,
      nama,
      tanggal: today,
      status,
      keterangan,
      checkin: now,
      checkout: '-'
    });

    return json({
      success: true
    });

  } catch (e) {

    return json({
      success: false,
      message: 'Absensi gagal'
    });

  }
}

export async function PUT({ request }) {

  try {

    const body = await request.json();

    const {
      id
    } = body;

    const now = new Date()
      .toLocaleTimeString('id-ID');

    await db
      .update(absensi)
      .set({
        checkout: now
      })
      .where(eq(absensi.id, id));

    return json({
      success: true
    });

  } catch (e) {

    return json({
      success: false
    });

  }
}

export async function GET() {

  const data = await db
    .select()
    .from(absensi);

  return json(data);
} 