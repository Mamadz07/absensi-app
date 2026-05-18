import { json } from '@sveltejs/kit';

let notifications = [
  {
    id: 1,
    title: 'System Online',
    desc: 'Server absensi berjalan normal',
    time: '1 menit lalu'
  },
  {
    id: 2,
    title: 'User Check In',
    desc: 'User 1 berhasil check in',
    time: '5 menit lalu'
  },
  {
    id: 3,
    title: 'Admin Update',
    desc: 'Admin menambahkan user baru',
    time: '10 menit lalu'
  }
];

export async function GET() {
  return json(notifications);
}