<script>
	import favicon from '$lib/assets/favicon.svg';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '../app.css';
	import { onMount } from 'svelte';

	onMount(() => {
		const setVH = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};

		setVH();

		const handleFocusOut = () => {
			// Small delay to allow keyboard animations to settle
			setTimeout(setVH, 100);
		};

		window.addEventListener('resize', setVH);
		window.addEventListener('focusout', handleFocusOut);

		return () => {
			window.removeEventListener('resize', setVH);
			window.removeEventListener('focusout', handleFocusOut);
		};
	});



	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
