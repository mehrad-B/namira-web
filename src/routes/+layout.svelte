<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="lang-fa hide-scrollbar relative min-h-screen overflow-hidden" dir="rtl">
	<div class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
		<div class="pattern-overlay absolute inset-0 opacity-20"></div>
		<div
			class="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-white/10 blur-xl"
		></div>
		<div
			class="absolute top-40 right-32 h-24 w-24 animate-bounce rounded-full bg-purple-300/20 blur-lg"
		></div>
		<div
			class="absolute bottom-32 left-1/4 h-40 w-40 animate-pulse rounded-full bg-pink-300/10 blur-2xl"
		></div>
		<div
			class="absolute right-20 bottom-20 h-28 w-28 animate-bounce rounded-full bg-blue-300/15 blur-xl"
		></div>
	</div>

	<div class="hide-scrollbar relative z-10">
		{@render children()}
	</div>
</div>

<style>
	.pattern-overlay {
		background-image:
			radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
			radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
			linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%),
			linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%);
		background-size:
			60px 60px,
			60px 60px,
			30px 30px,
			30px 30px;
		background-position:
			0 0,
			30px 30px,
			0 0,
			15px 15px;
	}
</style>
