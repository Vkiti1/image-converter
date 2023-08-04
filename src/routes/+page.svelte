<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { IImage } from '$lib/types';

	let drag = false;
	let selectedFiles: File[] = [];

	let inputRef: HTMLInputElement | null = null;

	let base64Images: IImage[] = [];

	let selectedImageType = 'png';

	const openFileSelect = () => {
		inputRef?.click();
	};

	const enhanceHandler: SubmitFunction = ({ formData }) => {
		for (const image of selectedFiles) {
			formData.append('images', image);
		}

		return async ({ result }) => {
			if (result.type === 'success') {
				base64Images = result.data as IImage[];
			}
		};
	};

	const dropHandler = (e: DragEvent) => {
		e.preventDefault();

		const files = e?.dataTransfer?.files;

		if (files && files.length > 0) selectedFiles = Array.from(files);

		drag = false;
	};
</script>

{#if $page?.data?.session?.user}
	<form
		method="POST"
		action="?/convertImage"
		enctype="multipart/form-data"
		use:enhance={enhanceHandler}
		class="flex flex-col items-center justify-center gap-10"
	>
		<input bind:this={inputRef} hidden multiple type="file" accept="image/*" name="images" />

		<select bind:value={selectedImageType} name="imageType" class="rounded-xl border-2 p-2">
			<option value="png">png</option>
			<option value="jpeg">jpeg</option>
			<option value="webp">webp</option>
		</select>

		<div>
			<div
				class="flex h-[200px] w-[400px] items-center justify-center rounded-xl border-2 border-dotted border-zinc-300"
				class:border-blue-200={drag}
				on:drop={dropHandler}
				on:dragover={(e) => {
					e.preventDefault();
					drag = true;
				}}
				on:dragenter={() => (drag = true)}
				on:dragleave={() => (drag = false)}
				role="none"
			>
				<button
					on:click={openFileSelect}
					type="button"
					class="rounded-xl border bg-zinc-200 px-4 py-2 font-semibold transition-colors hover:bg-zinc-400"
					>Select a file</button
				>
			</div>
			<p class="text-center">Drag and drop your images or select them.</p>
		</div>

		<button
			type="submit"
			class="rounded-xl border-2 border-blue-600 bg-blue-200 px-4 py-2 transition-all hover:scale-105 hover:bg-blue-400 hover:text-white"
			>Convert images</button
		>
	</form>

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
{/if}
