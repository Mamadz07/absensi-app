<script>
  import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  User,
  LogOut,
  Menu
} from 'lucide-svelte';

  let open = true;

  let role = '';

  if (typeof window !== 'undefined') {
    role = localStorage.getItem('role');
  }

  async function logout() {
    await fetch('/api/logout', {
      method: 'POST'
    });

    localStorage.clear();

    window.location.href = '/';
  }

 const menus = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    link: '/dashboard'
  },
  {
    title: 'Absensi',
    icon: CalendarCheck,
    link: '/absensi'
  },
  {
    title: 'Profile',
    icon: User,
    link: '/profile'
  }
];

  const adminMenus = [
    {
      title: 'Users',
      icon: Users,
      link: '/admin'
    }
  ];
</script>

<button
  on:click={() => open = !open}
  class="fixed top-5 left-5 z-50 lg:hidden bg-slate-900 border border-slate-700 p-3 rounded-xl text-white"
>
  <Menu size={24} />
</button>

<div
  class={`fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 z-40
  ${open ? 'translate-x-0' : '-translate-x-full'}
  w-72`}
>

  <div>

    <div class="p-8 border-b border-slate-800">

      <div class="flex items-center gap-4">

        <div class="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-black">

          A

        </div>

        <div>

          <h1 class="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Absensi
          </h1>

          <p class="text-slate-400 text-sm">
            Enterprise System
          </p>

        </div>

      </div>

    </div>

    <nav class="p-6 space-y-3">

      {#each menus as menu}

        <a
          href={menu.link}
          class="group flex items-center gap-4 bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 p-5 rounded-2xl text-white font-semibold"
        >

          <svelte:component
            this={menu.icon}
            size={22}
            class="group-hover:scale-110 transition"
          />

          {menu.title}

        </a>

      {/each}

      {#if role === 'admin'}

        {#each adminMenus as menu}

          <a
            href={menu.link}
            class="group flex items-center gap-4 bg-slate-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 transition-all duration-300 p-5 rounded-2xl text-white font-semibold"
          >

            <svelte:component
              this={menu.icon}
              size={22}
              class="group-hover:scale-110 transition"
            />

            {menu.title}

          </a>

        {/each}

      {/if}

    </nav>

  </div>

  <div class="p-6 border-t border-slate-800">

    <button
      on:click={logout}
      class="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition-all duration-300 p-5 rounded-2xl font-bold text-white"
    >

      <LogOut size={20} />

      Logout

    </button>

  </div>

</div>