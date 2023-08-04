<script>
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import '../app.css';

	const handleLogIn = () => {
		if (!$page?.data?.session?.user) return signIn('google');
		return signOut();
	};
</script>

<div class="space-y-20 px-20 py-10">
	<div>
		<button
			on:click={handleLogIn}
			class="rounded-xl border-2 bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-300"
		>
			{#if $page?.data?.session?.user}
				Sign Out
			{:else}
				Sign in with Google
			{/if}
		</button>
		{#if $page?.data?.message}
			<p>{$page.data.message}</p>
		{/if}
	</div>
	<div class="flex w-full items-center justify-center">
		<slot />
	</div>
</div>
