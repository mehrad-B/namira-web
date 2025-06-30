import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { SECRET_KEY, API_URL } from '$env/static/private';
import { base64ToUint8Array, decryptAESGCM } from '$lib/utils';
import type { JobResult, TestResult } from '$lib/types';

export const GET: RequestHandler = async (event) => {
	const params = event.url.searchParams;
	const limitParam = params.get('limit');
	const protocolParam = params.get('protocol');
	const sortParam = params.get('sort');

	const limit = limitParam ? parseInt(limitParam, 10) : undefined;
	const protocol = protocolParam ?? undefined;
	const sortDesc = sortParam === 'true';
	try {
		const response = await axios.get<string>(API_URL);
		const base64Data = response.data.trim();
		const encryptedBytes = base64ToUint8Array(base64Data);

		if (!SECRET_KEY) throw new Error('Encryption key not provided');

		const keyBytes = new TextEncoder().encode(SECRET_KEY);
		if (keyBytes.length !== 32) throw new Error('Key length is not 32 bytes');

		const decryptedJson = await decryptAESGCM(encryptedBytes, keyBytes);
		const jobResult = JSON.parse(decryptedJson) as JobResult;
		let results: TestResult[] = jobResult.results;

		if (protocol) {
			results = results.filter((r) => r.protocol === protocol);
		}

		if (sortDesc) {
			results = results.sort((a, b) => b.delay_ms - a.delay_ms);
		}

		if (typeof limit === 'number' && limit >= 0) {
			results = results.slice(0, limit);
		}

		const rawConfigs = results.map((r) => r.raw_config).join('\n');
		const encoded = Buffer.from(rawConfigs, 'utf-8').toString('base64');
		return new Response(encoded, {
			headers: { 'Content-Type': 'text/plain; charset=utf-8' }
		});
	} catch (err: unknown) {
		console.error(err);

		let message = 'خطای غیر منتظره. لطفا مجدد تلاش کنید.';
		if (axios.isAxiosError(err)) {
			if (err.response?.status === 404) {
				message = 'لیست دریافت نشد. اتصال خود را به اینترنت بررسی کنید.';
			} else {
				message = 'پاسخی از سرور دریافت نشد.';
			}
		}

		return new Response(message, {
			status: 500,
			headers: { 'Content-Type': 'text/plain; charset=utf-8' }
		});
	}
};
