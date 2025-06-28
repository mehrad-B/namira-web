<script lang="ts">
	import Navbar from '../../components/navbar.svelte';
	import { fade } from 'svelte/transition';

	type currencyType = 'btc' | 'trx' | 'usdt';
	let selectedcurrency = $state<currencyType>('btc');

	const currencies: currencyType[] = ['btc', 'trx', 'usdt'];
	let copied = $state<boolean>(false);

	const btcWallet = 'bc1qyj9j9e8u44d8garx0s5talus9atgkgq5dzkn4t';
	const trxWallet = 'TDTKLiU4KVWcL7Csh9QLHue7DxKDjxu3A6';
	const usdtWallet = '0xdA256B124181d8Aae6e0D55B2bf9f2aa7Bd8777d';
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
			<h1 class="text-lg font-semibold text-white sm:text-xl lg:text-2xl">حمایت مالی</h1>
		</div>
		<br />
		<div class="flex flex-col gap-2 rounded-lg bg-gray-100 p-4">
			<div>
				<div class="flex w-full items-center gap-3 rounded-lg border-gray-400">
					{#each currencies as c}
						<button
							type="button"
							class="w-full cursor-pointer rounded-lg border border-gray-400 px-4 py-2 transition duration-200 ease-in-out hover:border-orange-500"
							class:border-orange-600={selectedcurrency === c}
							class:bg-orange-100={selectedcurrency === c}
							class:font-semibold={selectedcurrency === c}
							class:text-orange-600={selectedcurrency === c}
							onclick={() => (selectedcurrency = c)}
							aria-pressed={selectedcurrency === c}
						>
							{c.toUpperCase()}
						</button>
					{/each}
				</div>
				<br />
				<div class="flex w-full flex-row items-center justify-center gap-2 text-center">
					{#if selectedcurrency === 'btc'}
						<img src="/btc.svg" alt="BTC Logo" class="size-14" />
					{:else if selectedcurrency === 'trx'}
						<img
							src="/trx.svg"
							alt="TRX Logo"
							class="size-14"
						/>{:else if selectedcurrency === 'usdt'}
						<img src="/usdt.svg" alt="USDT Logo" class="size-14" />
					{/if}
					<div class="flex w-full max-w-[75px] flex-col justify-center gap-1">
						{#if selectedcurrency === 'btc'}
							<p>بیت کوین</p>
						{:else if selectedcurrency === 'trx'}
							<p>ترون</p>
						{:else if selectedcurrency === 'usdt'}
							<p>تتر</p>
						{/if}
						<p class=" rounded-full bg-gray-300 px-2 py-1 text-center text-xs font-medium">
							{#if selectedcurrency === 'btc'}
								<span>BTC</span>
							{:else if selectedcurrency === 'trx'}
								<span>TRX</span>
							{:else if selectedcurrency === 'usdt'}
								<span>BEP20</span>
							{/if}
						</p>
					</div>
				</div>
				<div class="flex w-full justify-center">
					{#if selectedcurrency === 'btc'}
						<img src="qr-btc.png" alt="BTC QR Code" class="m-2 h-64 w-64 rounded-xl" />
					{:else if selectedcurrency === 'trx'}
						<img src="qr-trx.png" alt="TRX QR Code" class="m-2 h-64 w-64 rounded-xl" />
					{:else if selectedcurrency === 'usdt'}
						<img src="qr-usdt.png" alt="USDT (BEP20) QR Code" class="m-2 h-64 w-64 rounded-xl" />
					{/if}
				</div>
				<div class="mt-4 flex w-full flex-row-reverse items-center justify-center gap-2">
					<p
						dir="ltr"
						class="w-full truncate rounded-lg border-2 border-dashed border-gray-400 bg-gray-200 p-2 font-mono"
					>
						{#if selectedcurrency === 'btc'}
							<span>{btcWallet}</span>
						{:else if selectedcurrency === 'trx'}
							<span>{trxWallet}</span>
						{:else if selectedcurrency === 'usdt'}
							<span>{usdtWallet}</span>
						{/if}
					</p>
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						class="rounded-lg border-2 border-dashed border-gray-400 bg-gray-200 p-2"
						onclick={async () => {
							let address = '';
							switch (selectedcurrency) {
								case 'btc':
									address = btcWallet;
									break;
								case 'trx':
									address = trxWallet;
									break;
								case 'usdt':
									address = usdtWallet;
									break;
							}
							try {
								await navigator.clipboard.writeText(address);
								copied = true;
								setTimeout(() => (copied = false), 5000);
							} catch (err) {
								console.error('Failed to copy:', err);
							}
						}}
						>{#if copied}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
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
								class="size-6"
								in:fade
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
								/>
							</svg>
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
