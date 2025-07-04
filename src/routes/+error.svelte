<script lang="ts">
	import { page } from '$app/state';
	import Navbar from '../components/navbar.svelte';
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
			<h1 class="text-lg font-semibold text-white sm:text-xl lg:text-2xl">خطا</h1>
		</div>
		<br />
		<div
			class="flex flex-col items-center justify-center rounded-lg bg-white/15 p-4 text-justify leading-7 text-white backdrop-blur-xl"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-24 text-white"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
				/>
			</svg>
			<br />
			<div class="text-center">
				{#if page.status === 404}
					<h2 class="mb-2 text-xl font-bold">صفحه مورد نظر پیدا نشد.</h2>
					<p>به نظر می‌رسد صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
				{:else if page.status === 500}
					<h2 class="mb-2 text-xl font-bold">خطای داخلی سرور</h2>
					<p>متاسفانه مشکلی در سرور رخ داده است. لطفا بعدا دوباره تلاش کنید.</p>
				{:else}
					<h2 class="mb-2 text-xl font-bold">خطای ناشناخته</h2>
					<p>متاسفانه خطایی رخ داده است. لطفا بعدا دوباره تلاش کنید.</p>
				{/if}
			</div>
		</div>
	</div>
</div>
