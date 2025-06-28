<script lang="ts">
	import type { PageProps } from './$types';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { countryCodeToEmoji, toPersianDigits } from '$lib/utils';
	import {
		downloads,
		platformLabels,
		type JobResult,
		type Platform,
		type TestResult
	} from '$lib/types';
	import Navbar from '../components/navbar.svelte';

	let { data }: PageProps = $props();

	const PAGINATION_SIZE: number = 10;

	type AppState = {
		data: JobResult | null;
		loading: boolean;
		error: string | null;
		menu: boolean;
		copiedIndex: number | null;
		dialog: boolean;
		accordion: AccordionState;
		selectedConfig: string | null;
		selectedRemark: string | null;
		activeProtocol: TestResult['protocol'] | null;
		page: number;
	};

	type AccordionState = {
		android: boolean;
		ios: boolean;
		pc: boolean;
		links: boolean;
		copied: boolean;
	};

	const state = $state<AppState>({
		data: null,
		loading: true,
		error: data.error,
		menu: false,
		copiedIndex: null,
		dialog: false,
		accordion: {
			android: false,
			ios: false,
			pc: false,
			links: false,
			copied: false
		},
		selectedConfig: null,
		selectedRemark: null,
		activeProtocol: null,
		page: 1
	});

	const fetchJob = async () => {
		let result = data.data as unknown as JobResult;
		state.data = result;
		state.error = data.error;
		state.loading = false;
	};

	$effect(() => {
		fetchJob();
		document.documentElement.style.overflow = state.menu || state.dialog ? 'hidden' : '';
	});

	function filterByProtocol(
		results: TestResult[],
		protocol: AppState['activeProtocol']
	): TestResult[] {
		if (protocol === null) {
			return results;
		}
		const filteredResult = results.filter((result) => result.protocol === protocol);
		return filteredResult;
	}
	function sortByPing(results: TestResult[]): TestResult[] {
		return [...results].sort((a, b) => a.delay_ms - b.delay_ms);
	}

	function paginateResults<T>(results: T[], page: number): T[] {
		if (page < 0 || PAGINATION_SIZE < 1) return [];
		const endIndex = 0 + PAGINATION_SIZE * page;
		return results.slice(0, endIndex);
	}

	function prepareResults(results: TestResult[]) {
		return filterByProtocol(sortByPing(results), state.activeProtocol);
	}

	function hasMorePages(results: TestResult[], page: number, perPage: number): boolean {
		const total = results.length;
		return total > perPage && page < Math.ceil(total / perPage) - 1;
	}
	function btoaUtf8(str: string): string {
		return btoa(unescape(encodeURIComponent(str)));
	}
</script>

<Navbar></Navbar>

{#if state.menu}
	<div class="fixed z-50 flex h-screen w-screen flex-col-reverse">
		<div
			in:fly={{ y: 300, duration: 300, easing: cubicOut }}
			out:fly={{ y: 300, duration: 300, easing: cubicIn }}
			class="absolute z-50 flex max-h-3/4 w-full flex-col items-center gap-4 overflow-y-auto rounded-t-lg border-0 bg-white/10 p-3 backdrop-blur-2xl"
		>
			<div class="h-2 w-1/2 rounded-full bg-gray-300/10 backdrop-blur-lg md:w-1/4"></div>
			<div class="flex w-full flex-col gap-2 px-2 py-2 lg:px-8">
				<h1 class="text-center text-2xl font-bold text-white">انتخاب پروتکل</h1>
			</div>
			<div class="mx-auto w-full max-w-4xl space-y-2">
				<button
					onclick={(event: MouseEvent) => {
						event.stopPropagation();
						state.activeProtocol = 'vmess';
						state.menu = false;
						state.page = 1;
					}}
					class="w-full rounded-lg bg-gray-300 px-4 py-2 text-gray-600 transition-colors duration-100 hover:bg-gray-400 hover:text-gray-100"
				>
					VMess
				</button>
				<button
					onclick={(event: MouseEvent) => {
						event.stopPropagation();
						state.activeProtocol = 'vless';
						state.menu = false;
						state.page = 1;
					}}
					class="w-full rounded-lg bg-gray-300 px-4 py-2 text-gray-600 transition-colors duration-100 hover:bg-gray-400 hover:text-gray-100"
				>
					VLess
				</button>
				<button
					onclick={(event: MouseEvent) => {
						event.stopPropagation();
						state.activeProtocol = 'ss';
						state.menu = false;
						state.page = 1;
					}}
					class="w-full rounded-lg bg-gray-300 px-4 py-2 text-gray-600 transition-colors duration-100 hover:bg-gray-400 hover:text-gray-100"
				>
					Shadowsocks
				</button>
				<button
					onclick={(event: MouseEvent) => {
						event.stopPropagation();
						state.activeProtocol = 'trojan';
						state.menu = false;
						state.page = 1;
					}}
					class="w-full rounded-lg bg-gray-300 px-4 py-2 text-gray-600 transition-colors duration-100 hover:bg-gray-400 hover:text-gray-100"
				>
					Trojan
				</button>
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

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if state.dialog}
	<div class="fixed z-50 flex h-screen w-screen flex-col">
		<div
			in:fly={{ y: 300, duration: 300, easing: cubicOut }}
			out:fly={{ y: 300, duration: 300, easing: cubicIn }}
			class="absolute top-1/2 left-1/2 z-50 flex max-h-[90vh] w-[90vw] max-w-[1024px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 overflow-y-auto rounded-lg bg-white/10 p-3 backdrop-blur-2xl"
		>
			<div class="flex w-full flex-row">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					class="rounded-full bg-gray-100/20 p-0.5 text-white transition-colors duration-200 hover:bg-gray-400 hover:text-gray-100"
					onclick={() => {
						state.dialog = false;
						state.selectedConfig = null;
						state.selectedRemark = null;
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
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<h1 class="text-3xl font-bold text-white">اتصال کانفیگ</h1>
			<p class="text-center font-mono whitespace-break-spaces text-white">{state.selectedRemark}</p>
			<div class=" mt-4 flex h-full w-full flex-col space-y-4 overflow-x-scroll p-4">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="flex w-full flex-col rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 p-2 text-white"
					onclick={() => {
						state.accordion.android = !state.accordion.android;
					}}
				>
					<div class="flex w-full flex-row items-center justify-between">
						<div class="flex flex-row items-center justify-center gap-2">
							<img src="/android.svg" alt="Android Logo" class="h-7" />
							<p class="text-lg font-semibold">اندروید</p>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6 transform transition-transform duration-300"
							class:rotate-180={state.accordion.android}
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75 12 8.25l7.5 7.5">
							</path></svg
						>
					</div>
					{#if state.accordion.android}
						<div class="mt-3 flex flex-col items-center gap-2 p-2">
							<p class="font-bold">برنامه خود را انتخاب کنید</p>
							<a
								href={`v2rayng://install-config?url=${state.selectedConfig}`}
								class="w-full rounded-lg bg-white py-2 text-center text-gray-700"
								>افزودن به V2rayNG</a
							>
							<a
								href={`sn://subscription?url=${state.selectedConfig}`}
								class="w-full rounded-lg bg-white py-2 text-center text-gray-700"
								>افزودن به Nekobox</a
							>
						</div>
					{/if}
				</div>

				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="flex w-full flex-col rounded-lg bg-gradient-to-br from-indigo-300 via-purple-400 to-pink-300 p-2 text-white"
					onclick={() => {
						state.accordion.ios = !state.accordion.ios;
					}}
				>
					<div class="flex w-full flex-row items-center justify-between">
						<div class="flex flex-row items-center justify-center gap-2">
							<img src="/apple.svg" alt="Android Logo" class="h-7" />
							<p class="text-lg font-semibold">آیفون <span class="lang-en">(iOS)</span></p>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6 transform transition-transform duration-300"
							class:rotate-180={state.accordion.ios}
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75 12 8.25l7.5 7.5">
							</path></svg
						>
					</div>
					{#if state.accordion.ios}
						<div class="mt-3 flex flex-col items-center gap-2 p-2">
							<p class="font-bold">برنامه خود را انتخاب کنید</p>
							<a
								href={`streisand://import/${state.selectedConfig}`}
								class="w-full rounded-lg bg-white py-2 text-center text-gray-700"
								>افزودن به Streisand</a
							>
							<a
								href={`sub://${btoaUtf8(state.selectedConfig ?? '')}`}
								class="w-full rounded-lg bg-white py-2 text-center text-gray-700"
								>افزودن به Shadowrocket</a
							>
						</div>
					{/if}
				</div>

				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="flex w-full flex-col rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-2 text-white"
					onclick={() => {
						state.accordion.pc = !state.accordion.pc;
					}}
				>
					<div class="flex w-full flex-row items-center justify-between">
						<div class="flex flex-row items-center justify-center gap-2">
							<img src="/pc.svg" alt="Android Logo" class="h-7" />
							<p class="text-lg font-semibold">مک/ویندوز/لینوکس</p>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6 transform transition-transform duration-300"
							class:rotate-180={state.accordion.pc}
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75 12 8.25l7.5 7.5">
							</path></svg
						>
					</div>
					{#if state.accordion.pc}
						<div class="w-full p-4 pb-2">
							<button
								dir="ltr"
								class="flex w-full flex-row items-center justify-between gap-2 rounded-lg bg-gray-100 p-2 text-gray-700"
								class:border-green-300={state.accordion.copied}
								class:text-green-700={state.accordion.copied}
								class:bg-green-100={state.accordion.copied}
								onclick={async (event: MouseEvent) => {
									event.stopPropagation();
									state.accordion.copied = true;
									try {
										await navigator.clipboard.writeText(state.selectedConfig ?? '');
										setTimeout(() => (state.accordion.copied = false), 5000);
									} catch (err) {
										console.error('Failed to copy:', err);
									}
								}}
							>
								{#if state.accordion.copied}
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

								{#if state.accordion.copied}
									<p>کپی شد</p>
								{:else}
									<p>کپی کردن کانفیگ</p>
								{/if}
							</button>
						</div>
					{/if}
				</div>

				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="flex w-full flex-col rounded-lg bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400 p-2 text-white"
					onclick={() => {
						state.accordion.links = !state.accordion.links;
					}}
				>
					<div class="flex w-full flex-row items-center justify-between">
						<div class="flex flex-row items-center justify-center gap-2">
							<img src="/download.svg" alt="Android Logo" class="h-7" />
							<p class="text-lg font-semibold">لینک‌های دانلود</p>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6 transform transition-transform duration-300"
							class:rotate-180={state.accordion.links}
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75 12 8.25l7.5 7.5">
							</path></svg
						>
					</div>
					{#if state.accordion.links}
						<div class="mt-4 grid w-full grid-cols-1 gap-4 p-4 text-right sm:grid-cols-2">
							{#each Object.entries(downloads) as [platform, links]}
								<div class="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
									<h3 class="mb-2 text-sm font-bold tracking-tight text-white">
										{platformLabels[platform as Platform]}
									</h3>
									<ul class="space-y-2 text-sm text-blue-300">
										{#each links as link}
											<li>
												<a
													href={link.url}
													target="_blank"
													rel="noopener noreferrer"
													class="flex items-center justify-between transition-colors hover:text-blue-400"
												>
													<span>{link.name}</span>
													<svg
														class="h-4 w-4 rotate-180 opacity-60"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														viewBox="0 0 24 24"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M17 8l4 4m0 0l-4 4m4-4H3"
														/>
													</svg>
												</a>
											</li>
										{/each}
									</ul>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="h-screen w-full bg-black/60"
			onclick={() => {
				state.dialog = false;
				state.selectedConfig = null;
				state.selectedRemark = null;
			}}
		></div>
	</div>
{/if}

<!-- svelte-ignore a11y_consider_explicit_label -->
<button
	class="fixed right-4 bottom-24 z-20 rounded-full bg-orange-400 p-4 text-white shadow-2xl"
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
		class="size-8 lg:size-10"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
		/>
	</svg>
</button>

<div class="mb-12 flex w-screen justify-center">
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
			<div
				class="flex h-auto flex-col rounded-lg border border-red-400 bg-red-200 p-6 text-center text-xl text-red-800"
			>
				<p>{state.error}</p>
			</div>
		{/if}
		{#if state.data !== null}
			<div class="space-y-3">
				{#each paginateResults(prepareResults(state.data.results), state.page) as r, index}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						onclick={() => {
							state.dialog = true;
							state.selectedConfig = r.raw_config;
							state.selectedRemark = r.remark;
						}}
						class="flex flex-col justify-between gap-3 rounded-lg bg-white p-4 transition-transform duration-300 hover:scale-105"
					>
						<p class="text-center text-lg whitespace-nowrap sm:hidden">
							سرور {toPersianDigits(index + 1)}
						</p>
						<div class="flex w-full flex-row justify-between gap-2">
							<div class="flex max-w-full min-w-0 flex-row items-center gap-2">
								<p class="hidden whitespace-nowrap sm:block">سرور {toPersianDigits(index + 1)}</p>
								<p
									class="truncate overflow-hidden rounded-full bg-gray-300 px-2 py-1 text-xs font-bold"
									dir="rtl"
								>
									<!-- <span class="font-mono">{r.server}</span> -->
									{#if countryCodeToEmoji(r.country_code) !== null}
										{countryCodeToEmoji(r.country_code)} |
									{/if}
									<span class="font-mono" dir="ltr">{r.server}</span>
								</p>
							</div>
							<p
								class="min-w-fit rounded-full px-2 py-1 text-xs font-bold whitespace-nowrap"
								class:bg-red-100={r.protocol === 'ss'}
								class:text-red-600={r.protocol === 'ss'}
								class:bg-blue-100={r.protocol === 'trojan'}
								class:text-blue-600={r.protocol === 'trojan'}
								class:bg-purple-100={r.protocol === 'vless'}
								class:text-purple-600={r.protocol === 'vless'}
								class:bg-green-100={r.protocol === 'vmess'}
								class:text-green-600={r.protocol === 'vmess'}
							>
								پروتکل: <span class="font-mono">{r.protocol}</span>
							</p>
						</div>
						<div class="flex flex-row items-center justify-between gap-2 text-sm whitespace-nowrap">
							<p
								class={r.delay_ms < 600
									? 'text-green-600'
									: r.delay_ms < 1000
										? 'text-yellow-500/90'
										: 'text-red-600'}
							>
								تاخیر: {toPersianDigits(r.delay_ms)} میلی ثانیه
							</p>
							<button
								class="flex flex-row items-center justify-between gap-2 rounded-lg border border-gray-300 px-2 py-1 whitespace-nowrap"
								class:border-green-300={state.copiedIndex === index}
								class:text-green-700={state.copiedIndex === index}
								onclick={async (event: MouseEvent) => {
									event.stopPropagation();
									try {
										await navigator.clipboard.writeText(r.raw_config);
										state.copiedIndex = index;
										setTimeout(() => (state.copiedIndex = null), 5000);
									} catch (err) {
										console.error('Failed to copy:', err);
									}
								}}
							>
								{#if state.copiedIndex === index}
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

								{#if state.copiedIndex === index}
									<p>کپی شد</p>
								{:else}
									<p>کپی کردن کانفیگ</p>
								{/if}
							</button>
						</div>
					</div>
				{/each}
				{#if hasMorePages(prepareResults(state.data.results), state.page, PAGINATION_SIZE)}
					<button
						class="w-full rounded-lg bg-blue-500 p-2 text-center text-white transition-colors duration-200 hover:bg-blue-700"
						onclick={() => {
							state.page = state.page + 1;
						}}>بارگذاری بیشتر</button
					>
				{/if}
			</div>
		{/if}
	</div>
</div>
