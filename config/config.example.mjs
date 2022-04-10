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
};

export default config;
