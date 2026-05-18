import { json } from '@sveltejs/kit';

let absensi: any[] = [];

export async function POST({ request }: any) {
	try {
		const data = await request.json();

		const now = new Date();

		const item = {
			id: Date.now(),
			nama: data.nama,
			status: data.status,
			keterangan: data.keterangan || '-',
			tanggal: now.toLocaleDateString('id-ID'),
			checkin: now.toLocaleTimeString('id-ID'),
			checkout: '-'
		};

		absensi.unshift(item);

		return json({
			success: true,
			data: item
		});
	} catch (err) {
		console.log(err);

		return json(
			{
				success: false,
				message: 'Checkin gagal'
			},
			{
				status: 500
			}
		);
	}
}

export async function GET() {
	return json({
		success: true,
		data: absensi
	});
}