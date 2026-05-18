<script>
  import Sidebar from '$lib/components/sidebar.svelte';
  import { onMount } from 'svelte';

  let riwayat = [];
  let loading = false;

  let user = null;

  let sudahCheckin = false;

  onMount(() => {
    const localUser =
      localStorage.getItem('user');

    if (localUser) {
      user = JSON.parse(localUser);
    }

    loadData();
  });

  async function loadData() {
    const res = await fetch('/api/absensi');

    riwayat = await res.json();

    cekStatus();
  }

  function cekStatus() {
    if (!user) return;

    const today =
      new Date().toLocaleDateString();

    const cek = riwayat.find(
      (r) =>
        r.nama === user.nama &&
        r.tanggal === today
    );

    sudahCheckin = !!cek;
  }

  async function checkin() {
    if (!user) return;

    loading = true;

    const res = await fetch('/api/absensi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama: user.nama
      })
    });

    const data = await res.json();

    alert(data.message);

    await loadData();

    loading = false;
  }

  async function checkout(id) {
    loading = true;

    const res = await fetch('/api/absensi', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    });

    const data = await res.json();

    alert(data.message);

    await loadData();

    loading = false;
  }
</script>

<div class="min-h-screen bg-slate-950 text-white flex">

  <Sidebar />

  <main class="lg:ml-72 w-full p-6 lg:p-10">

    <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">

      <div>

        <h1 class="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
          Absensi
        </h1>

        <p class="text-slate-400 text-lg">
          Smart attendance monitoring realtime
        </p>

      </div>

      <div class="flex gap-4">

        {#if !sudahCheckin}

          <button
            on:click={checkin}
            disabled={loading}
            class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 px-8 py-5 rounded-2xl font-bold shadow-2xl"
          >
            {loading ? 'Loading...' : 'Check In'}
          </button>

        {:else}

          <div class="bg-green-500/20 text-green-400 px-8 py-5 rounded-2xl font-bold border border-green-500/20">

            Sudah Check In Hari Ini

          </div>

        {/if}

      </div>

    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">

        <p class="text-slate-400 mb-3">
          Total Absensi
        </p>

        <h2 class="text-5xl font-black">
          {riwayat.length}
        </h2>

      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">

        <p class="text-slate-400 mb-3">
          User Login
        </p>

        <h2 class="text-2xl font-black">
          {user?.nama || '-'}
        </h2>

      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">

        <p class="text-slate-400 mb-3">
          Status Hari Ini
        </p>

        <h2 class="text-2xl font-black text-cyan-400">

          {sudahCheckin
            ? 'Sudah Hadir'
            : 'Belum Check In'}

        </h2>

      </div>

    </div>

    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">

      <div class="p-6 border-b border-slate-800 flex items-center justify-between">

        <h2 class="text-3xl font-black">
          Riwayat Absensi
        </h2>

        <div class="text-cyan-400 text-sm">
          realtime data
        </div>

      </div>

      <div class="overflow-x-auto">

        <table class="w-full">

          <thead class="bg-slate-800">

            <tr>

              <th class="p-5 text-left">
                Nama
              </th>

              <th class="p-5 text-left">
                Tanggal
              </th>

              <th class="p-5 text-left">
                Check In
              </th>

              <th class="p-5 text-left">
                Check Out
              </th>

              <th class="p-5 text-left">
                Status
              </th>

              <th class="p-5 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {#each riwayat as item}

              <tr class="border-t border-slate-800 hover:bg-slate-800/40 transition">

                <td class="p-5 font-semibold">
                  {item.nama}
                </td>

                <td class="p-5">
                  {item.tanggal}
                </td>

                <td class="p-5 text-cyan-400 font-bold">
                  {item.checkin}
                </td>

                <td class="p-5 text-yellow-400 font-bold">
                  {item.checkout}
                </td>

                <td class="p-5">

                  <span class="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm font-bold">

                    {item.status}

                  </span>

                </td>

                <td class="p-5">

                  {#if item.checkout === '-'}

                    <button
                      on:click={() => checkout(item.id)}
                      class="bg-red-500 hover:bg-red-600 transition-all duration-300 px-5 py-3 rounded-xl font-semibold"
                    >
                      Checkout
                    </button>

                  {:else}

                    <span class="text-slate-500">
                      selesai
                    </span>

                  {/if}

                </td>

              </tr>

            {/each}

          </tbody>

        </table>

      </div>

    </div>

  </main>

</div>