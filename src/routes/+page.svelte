<script lang="ts">
	import type { PageProps } from './$types';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { toPersianDigits } from '$lib/utils';
	import type { JobResult } from '$lib/types';

	let { data }: PageProps = $props();

	type AppState = {
		data: JobResult | null;
		loading: boolean;
		error: string | null;
		menu: boolean;
		copiedIndex: number | null;
	};

	const state = $state<AppState>({
		data: null,
		loading: true,
		error: data.error,
		menu: false,
		copiedIndex: null
	});

	const fetchJob = async () => {
		state.data = data.data as unknown as JobResult;
		state.error = data.error;
		state.loading = false;
	};

	$effect(() => {
		fetchJob();
		document.body.classList.toggle('overflow-hidden', state.menu);
	});
</script>

{#if state.menu}
	<div class="fixed z-30 flex h-screen w-screen flex-col-reverse">
		<div
			in:fly={{ y: 300, duration: 300, easing: cubicOut }}
			out:fly={{ y: 300, duration: 300, easing: cubicIn }}
			class="absolute flex max-h-3/4 w-full flex-col items-center gap-4 overflow-y-auto rounded-t-lg bg-gray-100 p-3"
		>
			<div class="h-2 w-1/2 rounded-full bg-gray-300 md:w-1/4"></div>
			<div class="flex w-full flex-col gap-2 px-2 py-2 lg:px-8">
				<h1 class="text-center text-lg font-bold sm:text-2xl">انتخاب پروتکل</h1>
			</div>
		</div>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="h-screen w-full bg-black/60"
			onclick={() => {
				state.menu = false;
			}}
		></div>
	</div>
{/if}

<!-- svelte-ignore a11y_consider_explicit_label -->
<button
	class="fixed right-4 bottom-4 z-20 rounded-full bg-orange-400 p-4 text-white shadow-2xl"
	onclick={() => {
		state.menu = true;
	}}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
		/>
	</svg>
</button>

<!-- svelte-ignore a11y_consider_explicit_label -->
<a
	href="/info"
	class="fixed right-4 bottom-20 z-20 rounded-full bg-blue-400 p-4 text-white shadow-2xl"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
		/>
	</svg>
</a>

<div class="flex w-screen justify-center">
	<div class="w-full max-w-4xl px-4 py-12">
		<div class="text-center">
			<div class="flex flex-row items-center justify-center gap-6">
				<img src="/logo.jpeg" class="size-16 rounded-full sm:size-18 lg:size-20" alt="" />
				<h1 class="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">نامیرا نت</h1>
			</div>
			<br />
			<h1 class="text-lg font-semibold text-white sm:text-xl lg:text-2xl">
				سرور مورد نظر خود را انتخاب کنید
			</h1>
		</div>
		<br />
		{#if state.loading}
			<div class="space-y-3">
				{#each Array(8) as _, i}
					<div class="flex h-[100px] animate-pulse flex-col rounded-lg bg-gray-100"></div>{/each}
			</div>
		{/if}
		{#if state.error}
			<div class="flex h-[100px] flex-col rounded-lg border border-red-400 bg-red-200 p-4">
				<p>{state.error}</p>
			</div>
		{/if}
		{#if state.data !== null}
			<div class="space-y-3">
				{#each state.data.results as r (r.index)}
					<div
						class="flex flex-col justify-between gap-3 rounded-lg bg-white p-4 transition-transform duration-300 hover:scale-105"
					>
						<div class="flex flex-row">
							<div class="flex w-full flex-row items-center gap-2">
								<p>سرور {toPersianDigits(r.index)}</p>
								<p class="rounded-full bg-gray-300 px-2 py-1 text-xs font-bold">
									{r.protocol}
								</p>
							</div>
							{#if r.error === undefined}
								<div
									class="flex flex-row items-center gap-1 rounded-full bg-green-400 px-2 py-1 text-white"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
										/>
									</svg>
									<p class="text-xs font-bold">فعال</p>
								</div>{:else}
								<div
									class="flex flex-row items-center gap-1 rounded-full bg-red-500 px-2 py-1 text-white"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
										/>
									</svg>

									<p class="text-xs font-bold">خطا</p>
								</div>
							{/if}
						</div>
						<div class="flex flex-row items-center justify-between gap-2 text-sm">
							<p class="text-gray-600">
								تاخیر: {r.error ? 'بدون پاسخ' : `${toPersianDigits(r.delay_ms)} میلی‌ثانیه`}
							</p>
							<button
								class="flex flex-row items-center justify-between gap-2 rounded-lg border border-gray-300 px-2 py-1"
								class:border-green-300={state.copiedIndex === r.index}
								class:text-green-700={state.copiedIndex === r.index}
								onclick={async () => {
									try {
										await navigator.clipboard.writeText(r.raw_config);
										state.copiedIndex = r.index;
										setTimeout(() => (state.copiedIndex = null), 5000);
									} catch (err) {
										console.error('Failed to copy:', err);
									}
								}}
							>
								{#if state.copiedIndex === r.index}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4"
										in:fade
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="m4.5 12.75 6 6 9-13.5"
										/>
									</svg>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4"
										in:fade
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
										/>
									</svg>{/if}

								{#if state.copiedIndex === r.index}
									<p>کپی شد</p>
								{:else}
									<p>کپی کردن کانفیگ</p>
								{/if}
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
