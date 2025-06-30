import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { SECRET_KEY, API_URL } from '$env/static/private';
import { base64ToUint8Array, decryptAESGCM } from '$lib/utils';
import type { JobResult, TestResult } from '$lib/types';

const VALID_PROTOCOLS: TestResult['protocol'][] = ['vmess', 'vless', 'trojan', 'ss'];
const VALID_PROTOCOLS_SET = new Set<TestResult['protocol']>(VALID_PROTOCOLS);

const VALID_COUNTRY_CODES = new Set([
	'af',
	'al',
	'dz',
	'as',
	'ad',
	'ao',
	'ai',
	'aq',
	'ag',
	'ar',
	'am',
	'aw',
	'au',
	'at',
	'az',
	'bs',
	'bh',
	'bd',
	'bb',
	'by',
	'be',
	'bz',
	'bj',
	'bm',
	'bt',
	'bo',
	'ba',
	'bw',
	'br',
	'bn',
	'bg',
	'bf',
	'bi',
	'kh',
	'cm',
	'ca',
	'cv',
	'cf',
	'td',
	'cl',
	'cn',
	'co',
	'km',
	'cg',
	'cd',
	'cr',
	'ci',
	'hr',
	'cu',
	'cy',
	'cz',
	'dk',
	'dj',
	'dm',
	'do',
	'ec',
	'eg',
	'sv',
	'gq',
	'er',
	'ee',
	'sz',
	'et',
	'fj',
	'fi',
	'fr',
	'ga',
	'gm',
	'ge',
	'de',
	'gh',
	'gr',
	'gd',
	'gt',
	'gn',
	'gw',
	'gy',
	'ht',
	'hn',
	'hu',
	'is',
	'in',
	'id',
	'ir',
	'iq',
	'ie',
	'il',
	'it',
	'jm',
	'jp',
	'jo',
	'kz',
	'ke',
	'ki',
	'kp',
	'kr',
	'kw',
	'kg',
	'la',
	'lv',
	'lb',
	'ls',
	'lr',
	'ly',
	'li',
	'lt',
	'lu',
	'mk',
	'mg',
	'mw',
	'my',
	'mv',
	'ml',
	'mt',
	'mh',
	'mr',
	'mu',
	'mx',
	'fm',
	'md',
	'mc',
	'mn',
	'me',
	'ma',
	'mz',
	'mm',
	'na',
	'nr',
	'np',
	'nl',
	'nz',
	'ni',
	'ne',
	'ng',
	'no',
	'om',
	'pk',
	'pw',
	'pa',
	'pg',
	'py',
	'pe',
	'ph',
	'pl',
	'pt',
	'qa',
	'ro',
	'ru',
	'rw',
	'kn',
	'lc',
	'vc',
	'ws',
	'sm',
	'st',
	'sa',
	'sn',
	'rs',
	'sc',
	'sl',
	'sg',
	'sk',
	'si',
	'sb',
	'so',
	'za',
	'ss',
	'es',
	'lk',
	'sd',
	'sr',
	'se',
	'ch',
	'sy',
	'tw',
	'tj',
	'tz',
	'th',
	'tl',
	'tg',
	'to',
	'tt',
	'tn',
	'tr',
	'tm',
	'tv',
	'ug',
	'ua',
	'ae',
	'gb',
	'us',
	'uy',
	'uz',
	'vu',
	've',
	'vn',
	'ye',
	'zm',
	'zw'
]);

function parseInRange(s: string | null): number | null {
	return typeof s === 'string' && /^[1-9]\d{0,3}$|^10000$/.test(s) ? parseInt(s, 10) : null;
}

function isTruthyFlag(s: string | null): boolean {
	return s === 'true' || s === '';
}

function parseCountryCodes(input: string | null): string[] | null {
	if (input === null) return null;
	const codes = input.split(',').map((code) => code.trim().toLowerCase());
	return codes.every((code) => VALID_COUNTRY_CODES.has(code)) ? codes : null;
}

function parseProtocols(input: string | null): TestResult['protocol'][] | null {
	if (input === null) return null;

	const protocols = input.split(',').map((p) => p.trim().toLowerCase() as TestResult['protocol']);

	return protocols.every((p) => VALID_PROTOCOLS_SET.has(p)) ? protocols : null;
}

export const GET: RequestHandler = async (event) => {
	const params = event.url.searchParams;
	const limitParam = params.get('limit');
	const protocolParam = params.get('protocol');
	const sortParam = params.get('sort');
	const countryParam = params.get('country');

	if (limitParam !== null && parseInRange(limitParam) === null) {
		return new Response('Allowed limit range is 1-10000', {
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
			status: 422
		});
	}

	if (protocolParam !== null && parseProtocols(protocolParam) === null) {
		return new Response('Allowed protocols are: vmess,vless,ss,trojan', {
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
			status: 422
		});
	}

	if (sortParam !== null && isTruthyFlag(sortParam) === null) {
		return new Response('Invalid sort parameter value.', {
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
			status: 422
		});
	}

	if (countryParam !== null && parseCountryCodes(countryParam) === null) {
		return new Response('Invalid country code', {
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
			status: 422
		});
	}
	try {
		const response = await axios.get<string>(API_URL);
		const base64Data = response.data.trim();
		const encryptedBytes = base64ToUint8Array(base64Data);

		if (!SECRET_KEY) throw new Error('Encryption key not provided');
		const keyBytes = new TextEncoder().encode(SECRET_KEY);
		if (keyBytes.length !== 32) throw new Error('Encryption key must be 32 bytes');

		const decryptedJson = await decryptAESGCM(encryptedBytes, keyBytes);
		const jobResult = JSON.parse(decryptedJson) as JobResult;
		let results: TestResult[] = jobResult.results;

		if (sortParam !== null) {
			results = results.sort((a, b) => a.delay_ms - b.delay_ms);
		}

		if (countryParam !== null) {
			results = results.filter((r) =>
				parseCountryCodes(countryParam)?.includes(r.country_code.toLowerCase())
			);
		}

		if (protocolParam !== null) {
			results = results.filter((r) => parseProtocols(protocolParam)?.includes(r.protocol));
		}

		if (limitParam !== null) {
			const limit = parseInRange(limitParam) as number;
			results = results.slice(0, limit);
		}

		const rawConfigs = results.map((r) => r.raw_config).join('\n');
		const encoded = Buffer.from(rawConfigs, 'utf-8').toString('base64');

		return new Response(encoded, {
			headers: { 'Content-Type': 'text/plain; charset=utf-8' }
		});
	} catch (err: unknown) {
		console.error(err);

		let message = 'Unexpected error, please try again.';
		if (axios.isAxiosError(err)) {
			if (err.response?.status === 404) {
				message = 'Could not fetch list — please check your internet connection.';
			} else {
				message = 'No response received from server.';
			}
		}

		return new Response(message, {
			status: 500,
			headers: { 'Content-Type': 'text/plain; charset=utf-8' }
		});
	}
};
