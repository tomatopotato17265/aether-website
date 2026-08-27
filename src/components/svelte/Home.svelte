<script>
	import TopBar from './TopBar.svelte';
	import Hero from './Hero.svelte';
	import FeatureList from './FeatureList.svelte';

	let { heroSrc, heroWidth, heroHeight, appleIcon, linuxIcon, windowsIcon } = $props();
</script>

<TopBar />
<Hero {heroSrc} {heroWidth} {heroHeight} {appleIcon} {linuxIcon} {windowsIcon} />
<FeatureList />

<style>
	:global(html),
	:global(body) {
		margin: 0;
		height: 100%;
		background: var(--sl-color-bg);
		color: var(--sl-color-white);
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}
</style>
