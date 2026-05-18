import { json } from '@sveltejs/kit';

export async function POST({
  cookies
}) {
  cookies.delete('user_id', {
    path: '/'
  });

  cookies.delete('role', {
    path: '/'
  });

  return json({
    success: true
  });
}