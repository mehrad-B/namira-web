export type TestResult = {
	status: 'error' | 'success';
	delay_ms: number;
	protocol: 'vmess' | 'vless' | 'trojan' | 'ss';
	country_code: string;
	remark: string;
	raw_config: string;
	server: string;
};

export type JobResult = {
	job_id: string;
	timestamp: string;
	results: TestResult[];
};

export type Platform = 'windows' | 'mac' | 'linux' | 'android' | 'ios';

export type DownloadLink = {
	name: string;
	url: string;
};

export type DownloadMap = Record<Platform, DownloadLink[]>;
export type PlatformLabelMap = Record<Platform, string>;
export const downloads: DownloadMap = {
	android: [
		{
			name: 'V2rayNG',
			url: 'https://github.com/2dust/v2rayNG/releases/download/1.10.4/v2rayNG_1.10.4_universal.apk'
		},
		{
			name: 'NekoBox',
			url: 'https://github.com/MatsuriDayo/NekoBoxForAndroid/releases/download/1.3.9/NekoBox-1.3.9-arm64-v8a.apk'
		}
	],
	ios: [
		{
			name: 'Streisand',
			url: 'https://apps.apple.com/us/app/streisand/id6450534064'
		},
		{
			name: 'Shadowrocket',
			url: 'https://apps.apple.com/us/app/shadowrocket/id932747118'
		}
	],
	windows: [
		{
			name: 'V2rayN',
			url: 'https://github.com/2dust/v2rayN/releases/download/7.12.5/v2rayN-windows-64-SelfContained.zip'
		},
		{
			name: 'Nekoray',
			url: 'https://github.com/MatsuriDayo/nekoray/releases/download/4.0.1/nekoray-4.0.1-2024-12-12-windows64.zip'
		}
	],
	mac: [
		{
			name: 'V2rayN برای مک ARM',
			url: 'https://github.com/2dust/v2rayN/releases/download/7.12.5/v2rayN-macos-arm64.dmg'
		},
		{
			name: 'v2rayN برای مک Intel',
			url: 'https://github.com/2dust/v2rayN/releases/download/7.12.5/v2rayN-macos-64.dmg'
		}
	],
	linux: [
		{
			name: 'V2rayN برای لینوکس',
			url: 'https://github.com/2dust/v2rayN/releases/download/7.12.5/v2rayN-linux-64.zip'
		},
		{
			name: 'Nekoray',
			url: 'https://github.com/MatsuriDayo/nekoray/releases/download/4.0.1/nekoray-4.0.1-2024-12-12-linux64.zip'
		}
	]
};

export const platformLabels: PlatformLabelMap = {
	windows: 'ویندوز',
	mac: 'مک',
	linux: 'لینوکس',
	android: 'اندروید',
	ios: 'iOS'
};
