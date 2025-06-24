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
