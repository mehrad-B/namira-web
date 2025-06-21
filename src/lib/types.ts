export type TestResult = {
	index: number;
	status: 'error' | 'success';
	delay_ms: number;
	error?: string;
	protocol: 'vmess' | 'vless' | 'trojan' | 'ss';
	raw_config: string;
};

export type JobResult = {
	job_id: string;
	timestamp: string;
	results: TestResult[];
};
