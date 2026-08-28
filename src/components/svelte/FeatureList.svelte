<script>
	const FEATURES = ['Blazing Fast', 'Customizable UI', 'Extensible Architecture', 'Capability-Based Extensions'];

	let activeIndex = $state(0);

	function selectItem(index) {
		activeIndex = index;
	}

	$effect(() => {
		activeIndex;
		const timer = setInterval(() => {
			activeIndex = (activeIndex + 1) % FEATURES.length;
		}, 10000);
		return () => clearInterval(timer);
	});
</script>

<section class="features">
	<h2 class="features-title">Everything you could ever ask for</h2>
	<ul class="features-list">
		{#each FEATURES as term, index (term)}
			<li class="features-item" class:is-active={index === activeIndex}>
				<button type="button" class="features-item-button" onclick={() => selectItem(index)}>
					<svg class="features-check" viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
						<path
							d="M4 10.5l3.5 3.5L16 6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					{term}
				</button>
			</li>
		{/each}
	</ul>
</section>

<style>
	.features {
		max-width: 75rem;
		margin: 0 auto;
		padding: 5rem 1.5rem 7rem;
	}

	.features-title {
		margin: 0 0 1.75rem;
		text-align: left;
		font-weight: 800;
		letter-spacing: -0.02em;
		font-size: clamp(2.25rem, 5vw, 3.5rem);
	}

	.features-list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.features-item-button {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font: inherit;
		font-weight: 600;
		font-size: 1.375rem;
		color: var(--sl-color-gray-4);
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		transition: color 0.4s ease;
	}

	.features-item.is-active .features-item-button {
		color: var(--sl-color-white);
	}

	.features-check {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		color: var(--sl-color-gray-5);
		transition: color 0.4s ease;
	}

	.features-item.is-active .features-check {
		color: var(--sl-color-accent);
	}
</style>
