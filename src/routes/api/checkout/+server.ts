import { json } from '@sveltejs/kit';
import { absensi } from '$lib/data';

export async function POST({ request }) {

  const body = await request.json();

  const data = absensi.find(
    (a) => a.email === body.email
  );

  if (!data) {

    return json(
      {
        success: false,
        message: 'Data tidak ditemukan'
      },
      {
        status: 404
      }
    );

  }

  data.checkout =
    new Date().toLocaleTimeString();

  return json({
    success: true,
    data
  });

}