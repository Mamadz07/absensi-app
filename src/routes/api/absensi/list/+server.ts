import { db } from '$lib/server/db';
import { absensi } from '$lib/server/schema';

export async function GET() {
  try {
    const data = await db.select().from(absensi);

    return new Response(
      JSON.stringify(data)
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        success: false
      }),
      { status: 500 }
    );
  }
}