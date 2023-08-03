<script lang="ts">
	import { enhance } from '$app/forms';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { IImage } from '$lib/types';

	let inputRef: HTMLInputElement | null = null;

	let base64Images: IImage[] = [];

	let selectedImageType = 'png';

	const openFileSelect = () => {
		inputRef?.click();
	};

	const enhanceHandler: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'success') {
				base64Images = result.data as IImage[];
			}
		};
	};
</script>

{#if $page?.data?.session?.user?.image}
	<form
		method="POST"
		action="?/convertImage"
		enctype="multipart/form-data"
		use:enhance={enhanceHandler}
	>
		<input bind:this={inputRef} hidden multiple type="file" accept="image/*" name="images" />

		<select bind:value={selectedImageType} name="imageType">
			<option value="png">png</option>
			<option value="jpeg">jpeg</option>
			<option value="webp">webp</option>
		</select>

		<button on:click={openFileSelect} type="button">Click me</button>
		<button>Convert image</button>

		{#if base64Images.length > 0}
			{#each base64Images as image}
				<a href={`src/output/${image.fileName}`} download>
					<img
						src={`data:image/${image.fileName.split('.')[1]};base64, ${image.b64}`}
						alt="b64"
						width="200"
						height="200"
					/>
				</a>
			{/each}
		{/if}
	</form>
{/if}

{#if $page?.data?.message}
	<p>{$page.data.message}</p>
{/if}

<button on:click={() => signIn('google')}>Sign In with GitHub</button>
<button on:click={() => signOut()} class="button">Sign out</button>
