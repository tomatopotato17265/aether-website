<script>
	let { appleIcon, linuxIcon, windowsIcon } = $props();

	const PLATFORMS = {
		windows: {
			label: 'Windows',
			file: 'Aether-windows-amd64-installer.exe',
			fileLabel: 'Installer (.exe)',
			altLabel: 'Windows (Portable)',
			altFile: 'Aether-windows-amd64.exe',
		},
		mac: {
			label: 'macOS',
			file: 'Aether-macos-arm64.dmg',
			fileLabel: 'Apple Silicon (.dmg)',
			altLabel: 'macOS (Intel)',
			altFile: 'Aether-macos-amd64.dmg',
		},
		linux: {
			label: 'Linux',
			file: 'Aether-linux-amd64.AppImage',
			fileLabel: 'AppImage',
			altLabel: 'Linux (.tar.gz)',
			altFile: 'Aether-linux-amd64.tar.gz',
		},
	};

	function detectPlatform() {
		const ua = navigator.userAgent || '';
		const platform =
			(navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';

		const isIOS = /iPhone|iPad|iPod/i.test(ua) || (/Mac/i.test(platform) && navigator.maxTouchPoints > 1);
		const isAndroid = /Android/i.test(ua);

		if (isIOS || isAndroid) return null;

		if (/Win/i.test(platform) || /Windows/i.test(ua)) return 'windows';
		if (/Linux/i.test(platform) || /Linux/i.test(ua)) return 'linux';
		if (/Mac/i.test(platform) || /Macintosh|Mac OS X/i.test(ua)) return 'mac';
		return null;
	}

	let platform = $state(null);
	let ready = $state(false);
	let mainHref = $state('https://github.com/wayback09/Aether/releases');
	let altItem = $state(null);
	let otherGroups = $state([]);
	let menuOpen = $state(false);

	const iconUrl = $derived(
		platform === 'windows' ? windowsIcon : platform === 'mac' ? appleIcon : platform === 'linux' ? linuxIcon : null
	);
	const hasMenu = $derived(altItem !== null || otherGroups.length > 0);

	function closeMenu() {
		menuOpen = false;
	}

	function toggleMenu(event) {
		event.stopPropagation();
		menuOpen = !menuOpen;
	}

	$effect(() => {
		platform = detectPlatform();
		if (!platform) return;

		fetch('https://api.github.com/repos/wayback09/Aether/releases', {
			headers: { Accept: 'application/vnd.github+json' },
		})
			.then((res) => (res.ok ? res.json() : Promise.reject(new Error('GitHub API error ' + res.status))))
			.then((releases) => {
				const release = releases.find((r) => !r.draft && !r.prerelease) || releases.find((r) => !r.draft);
				if (!release) return;

				const assetUrls = {};
				for (const asset of release.assets) {
					assetUrls[asset.name] = asset.browser_download_url;
				}

				const current = PLATFORMS[platform];
				const url = assetUrls[current.file];
				if (!url) return;

				mainHref = url;

				const altUrl = assetUrls[current.altFile];
				if (altUrl) altItem = { label: current.altLabel, url: altUrl };

				const groups = [];
				for (const key of Object.keys(PLATFORMS)) {
					if (key === platform) continue;
					const other = PLATFORMS[key];
					const otherUrl = assetUrls[other.file];
					if (!otherUrl) continue;
					groups.push({ label: other.label, fileLabel: other.fileLabel, url: otherUrl });
				}
				otherGroups = groups;
				ready = true;
			})
			.catch((error) => {
				console.error('Failed to load Aether release assets:', error);
			});

		function onDocClick(event) {
			if (!event.target.closest('.download-split')) closeMenu();
		}
		function onKeydown(event) {
			if (event.key === 'Escape') closeMenu();
		}
		document.addEventListener('click', onDocClick);
		document.addEventListener('keydown', onKeydown);
		return () => {
			document.removeEventListener('click', onDocClick);
			document.removeEventListener('keydown', onKeydown);
		};
	});
</script>

{#if platform === null}
	<a class="hero-button hero-button-primary is-disabled" aria-disabled="true" onclick={(e) => e.preventDefault()}>
		<span class="download-label">Available on Desktop</span>
	</a>
{:else}
	<div class="download-split" class:has-menu={ready && hasMenu}>
		<a class="hero-button hero-button-primary download-main" href={mainHref}>
			{#if iconUrl}
				<span
					class="download-icon"
					style={`mask-image:url("${iconUrl}");-webkit-mask-image:url("${iconUrl}")`}
				></span>
			{/if}
			<span class="download-label">Download</span>
		</a>
		{#if ready && hasMenu}
			<button
				type="button"
				class="download-toggle"
				aria-haspopup="true"
				aria-expanded={menuOpen}
				aria-label="Other download options"
				onclick={toggleMenu}
			>
				<svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
					<path
						d="M4 6l4 4 4-4"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<div class="download-menu" class:is-open={menuOpen} role="menu">
				{#if altItem}
					<a class="download-menu-item" role="menuitem" href={altItem.url}>{altItem.label}</a>
				{/if}
				{#each otherGroups as group (group.label)}
					<div class="download-menu-header">{group.label}</div>
					<a class="download-menu-item" role="menuitem" href={group.url}>{group.fileLabel}</a>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.download-split {
		position: relative;
		display: inline-flex;
	}

	.download-split.has-menu .download-main {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.download-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		background: var(--sl-color-accent);
		color: var(--sl-color-white);
		border: 1.5px solid transparent;
		border-left: 1px solid hsla(0, 0%, 100%, 0.2);
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
		cursor: pointer;
	}

	.download-toggle:hover {
		filter: brightness(1.1);
	}

	.download-menu {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		z-index: 30;
		min-width: 13rem;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		padding: 0.375rem;
		background: var(--sl-color-bg-nav);
		border: 1px solid var(--sl-color-hairline);
		border-radius: 8px;
		box-shadow: 0 20px 50px hsla(0, 0%, 0%, 0.5);
		opacity: 0;
		transform: translateY(-4px);
		pointer-events: none;
		visibility: hidden;
		transition: opacity 0.12s ease, transform 0.12s ease, visibility 0.12s;
	}

	.download-menu.is-open {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
		visibility: visible;
	}

	.download-menu-item {
		display: block;
		padding: 0.5rem 0.625rem;
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--sl-color-white);
		text-decoration: none;
		white-space: nowrap;
	}

	.download-menu-item:hover {
		background: var(--sl-color-gray-6);
	}

	.download-menu-header {
		margin: 0.375rem -0.375rem 0;
		padding: 0.375rem 0.625rem 0.5rem;
		font-size: 0.8125rem;
		font-weight: 400;
		color: var(--sl-color-gray-3);
		border-bottom: 1px solid var(--sl-color-hairline);
	}

	.hero-button {
		display: inline-flex;
		align-items: center;
		border-radius: 8px;
		padding: 0.75rem 1.5rem;
		font-weight: 700;
		font-size: 1rem;
		text-decoration: none;
		border: 1.5px solid transparent;
	}

	.hero-button-primary {
		background: var(--sl-color-accent);
		color: var(--sl-color-white);
	}

	.hero-button.is-disabled {
		background: var(--sl-color-gray-5);
		color: var(--sl-color-gray-3);
		cursor: not-allowed;
		pointer-events: none;
	}

	.download-icon {
		display: inline-block;
		width: 1.05rem;
		height: 1.05rem;
		margin-right: 0.625rem;
		background-color: currentColor;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-position: center;
		-webkit-mask-size: contain;
		mask-size: contain;
	}
</style>
