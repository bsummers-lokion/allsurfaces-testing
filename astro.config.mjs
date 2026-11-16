// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'All Surfaces Testing',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/bsummers-lokion/allsurfaces-testing' }],
			sidebar: [
				{
					label: 'Issues',
					items: [
						{ label: '#619 Restricted Product Visibility', slug: 'issues/619-restricted-product-visibility' },
					],
				},
			],
		}),
	],
});
