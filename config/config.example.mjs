import fs from 'node:fs';

const config = {
	elastic: {
		clientOptions: {
			node: 'https://elastic.example.com:9200',
			auth: {
				username: 'elastic',
				password: 'VerySafePasswordHERE',
			},
			tls: {
				ca: fs.readFileSync('./config/elastic_ca.pem'),
				rejectUnauthorized: false,
			},
		},
		logIndex: 'behavior-log-index',
	},
	server: {
		port: 3000,
	},
	searching: {
		limits: {
			time: {
				minTimeBefore: 259_200_000,
				maxTimeBefore: 3_600_000,
				minDuration: 1_200_000,
			},
			subject: {
				minItems: 1,
				maxItems: 3,
			},
			object: {
				minItems: 1,
				maxItems: 12,
			},
			pageSize: 100,
		},
		desensitizing: {
			locations: {
				minRandom: 8,
				maxRandom: 24,
			},
		},
	},
};

export default config;
