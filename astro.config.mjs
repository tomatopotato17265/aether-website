// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
	site: 'https://aether-website-2uc.pages.dev',
	integrations: [
		svelte(),
		starlight({
			title: 'Aether',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/wayback09/Aether' }],
			customCss: ['./src/styles/custom.css'],
			components: {
				Head: './src/components/StarlightHead.astro',
				Header: './src/components/StarlightHeader.astro',
				MobileMenuFooter: './src/components/StarlightMobileMenuFooter.astro',
			},
			head: [
				{
					// Aether is dark-only. Pin the stored preference before Starlight's
					// ThemeProvider script reads it, so it always resolves to dark.
					tag: 'script',
					content: "localStorage.setItem('starlight-theme', 'dark');",
				},
			],
			sidebar: [
				{
					label: 'Welcome',
					items: [{ label: 'Welcome', slug: 'welcome' }],
				},
				{
					label: 'Developer',
					items: [{ autogenerate: { directory: 'developer' } }],
				},
				{
					label: 'Themes',
					items: [{ autogenerate: { directory: 'themes' } }],
				},
			],
		}),
	],
});
