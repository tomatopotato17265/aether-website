<script>
	import DownloadButton from './DownloadButton.svelte';

	let { heroSrc, heroWidth, heroHeight, appleIcon, linuxIcon, windowsIcon } = $props();
</script>

<main class="hero">
	<div class="hero-content">
		<h1 class="hero-title">A launcher that exists to launch Minecraft, and nothing more</h1>
		<p class="hero-tagline">
			Every feature that is not essential to launching the game, like downloading mods, managing
			servers, or viewing logs, is implemented as an extension. By keeping the core launcher
			intentionally minimal, Aether remains fast and free from bloat.
		</p>
		<div class="hero-actions">
			<DownloadButton {appleIcon} {linuxIcon} {windowsIcon} />
		</div>
	</div>
	<div class="hero-image">
		<img src={heroSrc} width={heroWidth} height={heroHeight} alt="" loading="eager" fetchpriority="high" />
	</div>
</main>

<style>
	.hero {
		min-height: calc(100vh - 4rem);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 3rem;
		max-width: 75rem;
		margin: 0 auto;
		padding: 1.5rem;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		gap: 1.25rem;
		max-width: 32rem;
		flex-shrink: 0;
	}

	.hero-image {
		flex: 1;
		min-width: 0;
		display: flex;
		justify-content: center;
	}

	.hero-image img {
		width: 100%;
		height: auto;
		box-shadow: 0 50px 100px -20px hsla(0, 0%, 0%, 0.65), 0 30px 60px -30px hsla(0, 0%, 0%, 0.5);
	}

	@media (max-width: 64rem) {
		.hero {
			flex-direction: column;
			justify-content: center;
			text-align: center;
		}

		.hero-content {
			align-items: center;
			text-align: center;
		}
	}

	.hero-title {
		margin: 0;
		font-weight: 800;
		letter-spacing: -0.02em;
		font-size: clamp(2.5rem, 6vw, 4rem);
		line-height: 1.05;
	}

	.hero-tagline {
		margin: 0;
		max-width: 32rem;
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--sl-color-gray-2);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}
</style>
