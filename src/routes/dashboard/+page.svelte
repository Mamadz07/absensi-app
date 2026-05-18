<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let user: any = null;

	let status = 'Hadir';
	let keterangan = '';

	let riwayat: any[] = [];

	onMount(() => {

		const data = localStorage.getItem('user');

		if (!data) {
			goto('/');
			return;
		}

		user = JSON.parse(data);

		loadRiwayat();
	});

	async function loadRiwayat() {

		const res = await fetch('/api/checkin');

		const data = await res.json();

		riwayat = data.data || [];
	}

	async function checkin() {

		const res = await fetch('/api/checkin', {

			method: 'POST',

			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({
				nama: user.nama,
				status,
				keterangan
			})
		});

		const data = await res.json();

		if (data.success) {

			alert('Absensi berhasil');

			loadRiwayat();

		} else {

			alert('Absensi gagal');
		}
	}

	function logout() {

		localStorage.removeItem('user');

		goto('/');
	}
</script>

<div class="min-h-screen bg-slate-950 text-white p-6">

	<div class="max-w-6xl mx-auto">

		<div class="flex justify-between items-center mb-8">

			<div>

				<h1 class="text-4xl font-black">
					Dashboard
				</h1>

				<p class="text-slate-400">
					Selamat datang {user?.nama}
				</p>

			</div>

			<button
				on:click={logout}
				class="bg-red-500 px-5 py-3 rounded-2xl"
			>
				Logout
			</button>

		</div>

		{#if user?.role === 'admin'}

			<div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8">

				<h2 class="text-2xl font-bold mb-6">
					Panel Admin
				</h2>

				<div class="grid md:grid-cols-3 gap-5">

					<div class="bg-slate-800 rounded-2xl p-5">
						<p class="text-slate-400">
							Total User
						</p>

						<h3 class="text-4xl font-black">
							2
						</h3>
					</div>

					<div class="bg-slate-800 rounded-2xl p-5">
						<p class="text-slate-400">
							Total Absensi
						</p>

						<h3 class="text-4xl font-black">
							{riwayat.length}
						</h3>
					</div>

					<div class="bg-slate-800 rounded-2xl p-5">
						<p class="text-slate-400">
							Status Sistem
						</p>

						<h3 class="text-2xl font-black text-green-400">
							Online
						</h3>
					</div>

				</div>

			</div>

		{:else}

			<div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8">

				<h2 class="text-2xl font-bold mb-6">
					Absensi Hari Ini
				</h2>

				<div class="grid md:grid-cols-2 gap-5 mb-5">

					<select
						bind:value={status}
						class="bg-slate-800 border border-slate-700 rounded-2xl p-4"
					>
						<option>Hadir</option>
						<option>Izin</option>
						<option>Sakit</option>
						<option>Berkepentingan</option>
					</select>

					<input
						bind:value={keterangan}
						placeholder="Keterangan"
						class="bg-slate-800 border border-slate-700 rounded-2xl p-4"
					/>

				</div>

				<button
					on:click={checkin}
					class="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-2xl font-bold"
				>
					Checkin
				</button>

			</div>

		{/if}

		<div class="bg-slate-900 border border-slate-800 rounded-3xl p-6">

			<h2 class="text-2xl font-bold mb-6">
				Riwayat Absensi
			</h2>

			<div class="overflow-x-auto">

				<table class="w-full">

					<thead>

						<tr class="text-left border-b border-slate-800">

							<th class="pb-4">
								Nama
							</th>

							<th class="pb-4">
								Status
							</th>

							<th class="pb-4">
								Keterangan
							</th>

							<th class="pb-4">
								Tanggal
							</th>

							<th class="pb-4">
								Checkin
							</th>

						</tr>

					</thead>

					<tbody>

						{#each riwayat as item}

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
									{item.tanggal}
								</td>

								<td class="py-4">
									{item.checkin}
								</td>

							</tr>

						{/each}

					</tbody>

				</table>

			</div>

		</div>

	</div>

</div>