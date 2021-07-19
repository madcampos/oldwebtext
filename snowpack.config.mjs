/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, prefer-named-capture-group, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */

import { readFileSync } from 'fs';

const sslOptions = {
	cert: readFileSync('./snowpack.crt'),
	key: readFileSync('./snowpack.key')
};

const env = {
	// INFO: this url needs to be changed before building
	// PUBLIC_URL: 'https://madcampos.github.io/oldwebtext/',
	PUBLIC_URL: 'https://localhost:8080/',

	THEME_COLOR: '#9400d3',
	BACKGROUND_COLOR: '#252525',

	APP_NAME: 'Old Web Text',
	APP_SHORT_NAME: 'OWT',
	APP_DESCRIPTION: 'A text styles generator for the cool kids.',

	APPLE_ICON: './img/icons/maskable/apple-icon-180.png',
	SMALL_ICON: './img/icons/transparent/manifest-icon-192.png',
	SMALL_ICON_BG: './img/icons/maskable/manifest-icon-192.png',
	LARGE_ICON: './img/icons/transparent/manifest-icon-512.png',
	LARGE_ICON_BG: './img/icons/maskable/manifest-icon-512.png'
};

const manifest = readFileSync('./src/site.webmanifest', { encoding: 'utf8' }).replaceAll(/%(.+?)%/giu, (_, match) => env[match] ?? '');

function handleManifest(_req, res) {
	res.setHeader('Content-Type', 'text/javascript');

	return res.end(manifest);
}

function handleServiceWorker(_req, res) {
	res.setHeader('Content-Type', 'text/javascript');

	return res.end("self.addEventListener('install', () => self.skipWaiting()); self.addEventListener('activate', () => self.clients.matchAll({ type: 'window' }).then((clients) => clients.forEach((window) => window.navigate(window.url)))); self.addEventListener('fetch', (evt) => evt.respondWith(fetch(evt.request)));");
}

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	root: './src',
	env,
	mount: {
		src: '/'
	},
	routes: [
		{
			match: 'all',
			src: '/site.webmanifest',
			dest: handleManifest
		},
		{
			match: 'all',
			src: '/sw.js',
			dest: handleServiceWorker
		}
	],
	exclude: ['**/*.schema.json'],
	optimize: {
		minify: true,
		target: 'esnext'
	},
	plugins: [
		[
			'snowpack-plugin-minify-html',
			{
				htmlMinifierOptions: {
					caseSensitive: true,
					collapseBooleanAttributes: true,
					collapseInlineTagWhitespace: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					decodeEntities: true,
					minifyCSS: true,
					minifyURLs: true,
					quoteCharacter: '"',
					removeComments: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					sortAttributes: true,
					sortClassName: true,
					useShortDoctype: true
				}
			}
		]
	],
	devOptions: { secure: sslOptions },
	buildOptions: {
		out: 'dist',
		metaUrlPath: 'meta'
	}
};