<script lang="ts">
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error = '';
	let loading = false;

	async function login() {
		loading = true;
		error = '';

		try {
			const res = await fetch('/api/login', {
				method: 'POST',

				headers: {
					'Content-Type': 'application/json'
				},

				body: JSON.stringify({
					email,
					password
				})
			});

			const data = await res.json();

			if (!data.success) {
				error = data.message;
				loading = false;
				return;
			}

			localStorage.setItem(
				'user',
				JSON.stringify(data.user)
			);

			goto('/dashboard');
		} catch (err) {
			error = 'Server error';
		}

		loading = false;
	}
</script>

<div class="min-h-screen bg-slate-950 flex items-center justify-center p-6">

	<div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl">

		<div class="text-center mb-10">

			<div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto mb-5 flex items-center justify-center text-4xl font-black text-white">
				A
			</div>

			<h1 class="text-5xl font-black text-white mb-2">
				Absensi App
			</h1>

			<p class="text-slate-400">
				Enterprise Attendance System
			</p>

		</div>

		{#if error}
			<div class="bg-red-500/20 border border-red-500/40 text-red-300 p-4 rounded-2xl mb-5">
				{error}
			</div>
		{/if}

		<div class="space-y-5">

			<div>

				<label class="block text-slate-300 mb-2">
					Email
				</label>

				<input
					bind:value={email}
					type="email"
					placeholder="Masukkan email"
					class="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-cyan-500"
				/>

			</div>

			<div>

				<label class="block text-slate-300 mb-2">
					Password
				</label>

				<input
					bind:value={password}
					type="password"
					placeholder="Masukkan password"
					class="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-cyan-500"
				/>

			</div>

			<button
				on:click={login}
				class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-2xl"
			>
				{loading ? 'Loading...' : 'Login'}
			</button>

		</div>

		<div class="mt-8 text-sm text-slate-400">

			<p>admin@gmail.com / admin123</p>

			<p>user@gmail.com / user123</p>

		</div>

	</div>

</div>