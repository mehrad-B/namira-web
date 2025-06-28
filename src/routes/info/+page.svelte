<script lang="ts">
	import Navbar from '../../components/navbar.svelte';
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
			<h1 class="text-lg font-semibold text-white sm:text-xl lg:text-2xl">نگارش ۱.۰.۰</h1>
		</div>
		<br />
		<div class="flex flex-col rounded-lg bg-white p-4 text-justify leading-7">
			<h2 class="mb-2 text-xl font-bold">چرا نامیرا وجود دارد؟</h2>
			<p>
				این روزها که اینترنت زیر نظر شدید و آزادی‌های فردی هر روز محدودتر می‌شود، ما همچنان به این
				باور پایبندیم که اطلاعات باید آزادانه و بدون مانع منتقل شود.
			</p>
			<p class="mt-2">
				همین اعتقاد بود که نامیرا نت را به وجود آورد؛ نامی که یعنی «پاک» و نشان‌دهنده استقامت، ادامه
				مسیر و آزادی است.
			</p>

			<h2 class="mt-4 mb-2 text-xl font-bold">نامیرا: همیشه متصل، همیشه آزاد</h2>
			<p>نامیرا فقط یک اسم نیست، بلکه یک قول است.</p>
			<p class="mt-2">
				جایی که دسترسی به اینترنت یا اطلاعات محدود، کند یا حتی قطع می‌شود، ما محصولاتی می‌سازیم تا
				همیشه بتوانید به راحتی و بدون دغدغه به دنیای بیرون متصل بمانید.
			</p>
			<p class="mt-2">
				چه زیر سایه یک حکومت سخت‌گیر باشید، چه هر روز با قطعی اینترنت دست و پنجه نرم کنید (مثل
				شرایطی که در ایران می‌بینیم)، نامیرا همیشه راهی سریع، امن و بدون سانسور برای ارتباط فراهم
				می‌کند.
			</p>

			<h2 class="mt-4 mb-2 text-xl font-bold">مبارزه با سانسور و عبور از سد فایروال‌ها (GFW)</h2>
			<p>
				ما مخالف هر نوع سانسور و تبعیض هستیم و همیشه در تلاشیم تا محدودیت‌ها را بشکنیم. محصولات ما
				به شما کمک می‌کنند تا بتوانید از فایروال‌ها، بازرسی عمیق بسته‌ها و لیست‌های سیاه عبور کنید و
				به هر چیزی که می‌خواهید دسترسی داشته باشید.
			</p>

			<h2 class="mt-4 mb-2 text-xl font-bold">با ما همراه شوید</h2>
			<p>
				اگر شما هم مثل ما به آزادی اطلاعات اعتقاد دارید و حق مسلم همه انسان‌ها را برای ارتباط بدون
				محدودیت می‌دانید، خوشحال می‌شویم که به خانواده نامیرا بپیوندید.
			</p>
			<p class="mt-2 font-semibold">آزادی حق همه است، نه امتیاز عده‌ای خاص.</p>
		</div>

		<br />
		<div class="flex flex-col gap-2 rounded-lg bg-gray-100 p-4">
			<h1 class="text-lg font-semibold">لینک‌های کاربردی</h1>
			<div class="flex w-full flex-row-reverse items-center gap-4">
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
						d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
					/>
				</svg>
				<a href="mailto:namiranet@proton.me">namiranet@proton.me</a>
			</div>
			<div class="flex w-full flex-row-reverse items-center gap-4">
				<img src="/github.svg" class="size-6" alt="Github Logo" />
				<a class="lang-en" href="https://github.com/NaMiraNet">https://github.com/NaMiraNet</a>
			</div>
		</div>
	</div>
</div>
