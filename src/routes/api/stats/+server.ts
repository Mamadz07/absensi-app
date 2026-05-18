import { json } from '@sveltejs/kit';

export async function GET() {
  return json({
    totalUser: 245,
    hadir: 220,
    izin: 10,
    sakit: 5,
    alpha: 10,
    online: true
  });
}