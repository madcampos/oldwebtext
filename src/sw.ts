/* eslint-env serviceworker */
/* eslint-disable no-console */
/// <reference lib="webworker" />
export {};

const CACHE_VERSION = 'v1';
const appShellFiles = ['./index.html'];
const worker: ServiceWorkerGlobalScope = self as unknown as ServiceWorkerGlobalScope;

async function fetchFromCache(request: Request) {
	const res = await caches.match(request);

	if (res) {
		return res;
	}

	return null;
}

async function fetchFromNetwork(request: Request) {
	try {
		const netRes = await fetch(request);

		const STORAGE_TRESHOLD = 0.7;
		const { quota, usage } = await navigator.storage.estimate();
		const isReachingQuota = (usage ?? 0) / (quota ?? 1) >= STORAGE_TRESHOLD;

		if (!isReachingQuota) {
			const cacheRes = netRes.clone();
			const cache = await caches.open(CACHE_VERSION);

			await cache.put(request, cacheRes);
		}

		return netRes;
	} catch (err) {
		console.error('[⚙️] Network fetch failed!');
		console.error(err);
	}

	return new Response('Service Unavailable', {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		headers: new Headers({ 'Content-Type': 'text/plain' }),
		status: 503,
		statusText: 'Service Unavailable'
	});
}

worker.addEventListener('install', async () => {
	try {
		const cache = await caches.open(CACHE_VERSION);

		await cache.addAll(appShellFiles);

		await worker.skipWaiting();
		console.log(`[⚙️] Service worker installed for version ${CACHE_VERSION}`);
	} catch (err) {
		console.error('[⚙️] Error installing worker:');
		console.error(err);
	}
});

worker.addEventListener('activate', async () => {
	const clientList = await worker.clients.matchAll({ includeUncontrolled: true });

	clientList.forEach((client) => {
		console.log(`[⚙️] Matching client: ${client.url}`);
	});

	const cacheNames = await caches.keys();

	for await (const cacheName of cacheNames) {
		if (cacheName !== CACHE_VERSION) {
			console.log(`[⚙️] Deleting old cache "${cacheName}"`);

			await caches.delete(cacheName);
		}

		console.log(`[⚙️] Claming clients for version: ${CACHE_VERSION}`);

		await worker.clients.claim();
	}
});

worker.addEventListener('fetch', async (evt) => {
	let response = await fetchFromCache(evt.request);

	if (!response) {
		response = await fetchFromNetwork(evt.request);
	}

	return response;
});
