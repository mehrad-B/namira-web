<script lang="ts">
	import { fade } from 'svelte/transition';
	import Navbar from '../../components/navbar.svelte';

	import { page } from '$app/state';
	const subLink = `${page.url.origin}/api/subscription`;
	type AccordionState = {
		android: boolean;
		ios: boolean;
		pc: boolean;
		links: boolean;
		copied: boolean;
	};

	type SubState = {
		accordion: AccordionState;
	};

	const state = $state<SubState>({
		accordion: {
			android: false,
			ios: false,
			pc: false,
			links: false,
			copied: false
		}
	});
	function btoaUtf8(str: string): string {
		return btoa(unescape(encodeURIComponent(str)));
	}
</script>

<Navbar></Navbar>

<div class="mb-16 flex w-screen justify-center">
	<div class="w-full max-w-4xl px-4 py-12">
		<div class="text-center">
			<div class="flex flex-row items-center justify-center gap-6">
				<img src="/logo.jpeg" class="size-16 rounded-full sm:size-18 lg:size-20" alt="" />
				<h1 class="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">نامیرا نت</h1>
			</div>
			<br />
			<h1 class="text-lg font-semibold text-white sm:text-xl lg:text-2xl">لینک اشتراک</h1>
		</div>
		<br />
		<div class="mb-24 flex flex-col gap-4 rounded-lg bg-white p-4 text-justify leading-7">
			<h1 class="text-center text-lg font-bold">پلتفرم خود را انتخاب کنید</h1>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
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
							href={`v2rayng://install-config?url=${subLink}`}
							class="w-full rounded-lg bg-white py-2 text-center text-gray-700">افزودن به V2rayNG</a
						>
						<a
							href={`sn://subscription?url=${subLink}`}
							class="w-full rounded-lg bg-white py-2 text-center text-gray-700">افزودن به Nekobox</a
						>
					</div>
				{/if}
			</div>

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
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
							href={`streisand://import/${subLink}`}
							class="w-full rounded-lg bg-white py-2 text-center text-gray-700"
							>افزودن به Streisand</a
						>
						<a
							href={`sub://${btoaUtf8(subLink ?? '')}`}
							class="w-full rounded-lg bg-white py-2 text-center text-gray-700"
							>افزودن به Shadowrocket</a
						>
					</div>
				{/if}
			</div>

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
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
									await navigator.clipboard.writeText(subLink ?? '');
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
									<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
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
								<p>کپی کردن لینک اشتراک</p>
							{/if}
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
