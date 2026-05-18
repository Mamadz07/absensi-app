<script lang="ts">
  import { onMount } from 'svelte';

  let user: any;

  let users: any[] = [];
  let absensi: any[] = [];

  onMount(() => {

    const saved = localStorage.getItem('user');

    if (!saved) {

      location.href = '/';
      return;
    }

    user = JSON.parse(saved);

    if (user.role !== 'admin') {

      location.href = '/dashboard';
      return;
    }

    loadData();
  });

  async function loadData() {

    const userRes = await fetch('/api/users');
    users = await userRes.json();

    const absensiRes = await fetch('/api/absensi');
    absensi = await absensiRes.json();
  }
</script>

<div class="min-h-screen bg-slate-950 text-white p-8">

  <div class="max-w-7xl mx-auto">

    <div class="flex justify-between mb-8">

      <div>

        <h1 class="text-4xl font-black">
          Dashboard Admin
        </h1>

        <p class="text-slate-400">
          Monitoring Absensi
        </p>

      </div>

      <button
        on:click={() => {

          localStorage.removeItem('user');
          location.href = '/';

        }}
        class="bg-red-500 px-5 py-3 rounded-2xl"
      >
        Logout
      </button>

    </div>

    <div class="grid md:grid-cols-3 gap-5 mb-8">

      <div class="bg-slate-900 p-6 rounded-3xl border border-slate-800">

        <p class="text-slate-400">
          Total User
        </p>

        <h2 class="text-4xl font-black">
          {users.filter((u) => u.role === 'user').length}
        </h2>

      </div>

      <div class="bg-slate-900 p-6 rounded-3xl border border-slate-800">

        <p class="text-slate-400">
          Total Admin
        </p>

        <h2 class="text-4xl font-black">
          {users.filter((u) => u.role === 'admin').length}
        </h2>

      </div>

      <div class="bg-slate-900 p-6 rounded-3xl border border-slate-800">

        <p class="text-slate-400">
          Total Absensi
        </p>

        <h2 class="text-4xl font-black">
          {absensi.length}
        </h2>

      </div>

    </div>

    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-8 overflow-auto">

      <h2 class="text-2xl font-bold mb-5">
        Monitoring Absensi
      </h2>

      <table class="w-full">

        <thead>

          <tr class="border-b border-slate-700 text-slate-400">

            <th class="pb-4 text-left">
              Nama
            </th>

            <th class="pb-4 text-left">
              Status
            </th>

            <th class="pb-4 text-left">
              Keterangan
            </th>

            <th class="pb-4 text-left">
              Checkin
            </th>

            <th class="pb-4 text-left">
              Checkout
            </th>

          </tr>

        </thead>

        <tbody>

          {#each absensi as item}

            <tr class="border-b border-slate-800">

              <td class="py-4">
                {item.nama}
              </td>

              <td class="py-4">
                {item.status}
              </td>

              <td class="py-4">
                {item.keterangan}
              </td>

              <td class="py-4">
                {item.checkin}
              </td>

              <td class="py-4">
                {item.checkout}
              </td>

            </tr>

          {/each}

        </tbody>

      </table>

    </div>

  </div>

</div>