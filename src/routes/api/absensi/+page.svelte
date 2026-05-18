<script>
  async function checkIn() {
    const res = await fetch('/api/absensi/checkin', { method: 'POST' });
    const data = await res.json();
    alert(data.message || (data.success ? "Check-in berhasil" : "Gagal"));
  }

  async function checkOut() {
    const res = await fetch('/api/absensi/checkout', { method: 'POST' });
    const data = await res.json();
    alert(data.message || (data.success ? "Check-out berhasil" : "Gagal"));
  }
</script>

<h1>Absensi User</h1>

<button on:click={checkIn}>Check In</button>
<button on:click={checkOut}>Check Out</button>