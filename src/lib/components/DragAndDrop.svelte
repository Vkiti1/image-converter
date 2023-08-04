<script lang="ts">
	export let drag: boolean;
	export let dropHandler: (e: DragEvent) => void;
	export let openFileSelect: () => void;
</script>

<div>
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
</div>
