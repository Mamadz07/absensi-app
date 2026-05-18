<script>
  export let error;
  export let status;
</script>

<div class="min-h-screen bg-slate-950 flex items-center justify-center text-white p-10">

  <div class="text-center">

    <h1 class="text-8xl font-black mb-5">
      {status}
    </h1>

    <p class="text-2xl text-slate-400 mb-8">
      {error?.message}
    </p>

    <a
      href="/"
      class="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-2xl font-bold inline-block"
    >
      Kembali
    </a>

  </div>

</div>