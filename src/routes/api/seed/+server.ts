import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

export async function GET() {
	try {
		const adminPassword = await bcrypt.hash('admin123', 10);
		const userPassword = await bcrypt.hash('user123', 10);

		const users = [
			{
				id: 1,
				nama: 'Administrator',
				email: 'admin@gmail.com',
				password: adminPassword,
				role: 'admin'
			},
			{
				id: 2,
				nama: 'User Demo',
				email: 'user@gmail.com',
				password: userPassword,
				role: 'user'
			}
		];

		return json({
			success: true,
			message: 'Seed berhasil',
			users
		});
	} catch (err) {
		console.log(err);

		return json(
			{
				success: false,
				message: 'Seed gagal'
			},
			{
				status: 500
			}
		);
	}
}