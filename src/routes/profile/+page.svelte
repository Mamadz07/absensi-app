<script>
  import Sidebar from '$lib/components/sidebar.svelte';
  import { onMount } from 'svelte';

  let user = null;

  onMount(() => {
    const localUser =
      localStorage.getItem('user');

    if (localUser) {
      user = JSON.parse(localUser);
    }
  });
</script>

<div class="min-h-screen bg-slate-950 text-white flex">

  <Sidebar />

  <main class="lg:ml-72 w-full p-6 lg:p-10">

    <div class="max-w-4xl mx-auto">

      <div class="bg-slate-900 border border-slate-800 rounded-[40px] overflow-hidden shadow-2xl">

        <div class="h-52 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700"></div>

        <div class="p-10 relative">

          <div class="absolute -top-20 left-10 w-40 h-40 rounded-full bg-slate-800 border-8 border-slate-900 flex items-center justify-center text-6xl font-black">

            {user?.nama?.charAt(0)}

          </div>

          <div class="mt-24">

            <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

              <div>

                <h1 class="text-5xl font-black mb-3">
                  {user?.nama}
                </h1>

                <p class="text-slate-400 text-xl">
                  {user?.email}
                </p>

              </div>

              <div
                class={`px-6 py-3 rounded-2xl text-lg font-bold w-fit ${
                  user?.role === 'admin'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-cyan-500/20 text-cyan-400'
                }`}
              >
                {user?.role}
              </div>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

              <div class="bg-slate-800 rounded-3xl p-6">

                <p class="text-slate-400 mb-3">
                  Status
                </p>

                <h2 class="text-3xl font-black text-green-400">
                  Active
                </h2>

              </div>

              <div class="bg-slate-800 rounded-3xl p-6">

                <p class="text-slate-400 mb-3">
                  Login Role
                </p>

                <h2 class="text-3xl font-black">
                  {user?.role}
                </h2>

              </div>

              <div class="bg-slate-800 rounded-3xl p-6">

                <p class="text-slate-400 mb-3">
                  System
                </p>

                <h2 class="text-3xl font-black text-cyan-400">
                  Online
                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </main>

</div>