// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://blueprint-tools.vercel.app',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    responsiveStyles: true,
  },
});

export const siteConfig = {
  siteTitle: 'Blueprint for tooling applications',
  siteDescription: 'Tooling UIs for Blueprint',
  siteUrl: 'https://blueprint-tools.vercel.app',
  siteIcon: 'favicon.svg',
  language: 'en',
  locale: 'en-US',
  ogImage: 'display/og-image.png',
  author: {
    name: 'Equinix',
  },
};