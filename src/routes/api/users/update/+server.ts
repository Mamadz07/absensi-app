import { json } from '@sveltejs/kit';
import { users } from '../+server';

export async function PUT({ request }) {
  try {
    const body = await request.json();

    const index = users.findIndex(
      (u) => u.id === body.id
    );

    if (index === -1) {
      return json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    users[index] = {
      ...users[index],
      nama: body.nama,
      email: body.email,
      password: body.password,
      role: body.role
    };

    return json({
      success: true,
      message: 'User berhasil diupdate'
    });
  } catch (err) {
    console.error(err);

    return json({
      success: false,
      message: 'Update user gagal'
    });
  }
}