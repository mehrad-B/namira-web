import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { RATELIMIT_SECRET } from '$env/static/private';

if (!RATELIMIT_SECRET) throw new Error('Ratelimit secret key not provided');

const limiter = new RateLimiter({
	IP: [10, 'm'],
	IPUA: [5, 'm'],
	cookie: {
		name: 'client_id',
		secret: RATELIMIT_SECRET,
		rate: [2, 'm'],
		preflight: false
	}
});

export async function handle({ event, resolve }) {
	if (await limiter.isLimited(event)) {
		return new Response('Too many requests', { status: 429 });
	}
	return resolve(event);
}
