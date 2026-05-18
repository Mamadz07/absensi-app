import { json } from '@sveltejs/kit';

const users = [
	{
		id: 1,
		nama: 'Administrator',
		email: 'admin@gmail.com',
		password: 'admin123',
		role: 'admin'
	},
	{
		id: 2,
		nama: 'User Demo',
		email: 'user@gmail.com',
		password: 'user123',
		role: 'user'
	}
];

export async function POST({ request }: any) {
	try {
		const { email, password } = await request.json();

		const user = users.find(
			(u) =>
				u.email.toLowerCase() === email.toLowerCase()
		);

		if (!user) {
			return json({
				success: false,
				message: 'Email tidak ditemukan'
			});
		}

		if (user.password !== password) {
			return json({
				success: false,
				message: 'Password salah'
			});
		}

		return json({
			success: true,
			user: {
				id: user.id,
				nama: user.nama,
				email: user.email,
				role: user.role
			}
		});
	} catch (err) {
		console.log(err);

		return json(
			{
				success: false,
				message: 'Internal server error'
			},
			{
				status: 500
			}
		);
	}
}