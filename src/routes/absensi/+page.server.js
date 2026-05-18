import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  const user = cookies.get('user_id');

  if (!user) {
    throw redirect(302, '/');
  }

  return {};
}