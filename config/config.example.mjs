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
				notMoreThan: 259_200_000,
				notLessThan: 3_600_000,
				minDuration: 1_200_000,
			},
		},
	},
};

export default config;
