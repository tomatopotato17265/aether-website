// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://aether-website-2uc.pages.dev',
	integrations: [
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
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
