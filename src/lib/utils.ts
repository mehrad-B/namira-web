export function toPersianDigits(input: string | number): string {
	const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
	return input.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}

export function base64ToUint8Array(base64: string): Uint8Array {
	const binary_string = atob(base64);
	const len = binary_string.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes;
}

export async function decryptAESGCM(
	encryptedData: Uint8Array,
	keyBytes: Uint8Array
): Promise<string> {
	const nonce = encryptedData.slice(0, 12);
	const ciphertextWithTag = encryptedData.slice(12);

	const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, [
		'decrypt'
	]);

	const decryptedBuffer = await crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv: nonce,
			tagLength: 128
		},
		cryptoKey,
		ciphertextWithTag
	);

	return new TextDecoder().decode(decryptedBuffer);
}
