export function getUser() {
  if (typeof localStorage === 'undefined') return null;

  const user = localStorage.getItem('user');

  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem('user');
  window.location.href = '/';
}