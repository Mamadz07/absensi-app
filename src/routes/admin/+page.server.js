import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  const user = cookies.get('user_id');
  const role = cookies.get('role');

  if (!user) {
    throw redirect(302, '/');
  }

  if (role !== 'admin') {
    throw redirect(302, '/dashboard');
  }

  return {};
}