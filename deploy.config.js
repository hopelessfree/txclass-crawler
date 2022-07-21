module.exports = {
	apps: [
		{
			name: 'txclass-crawler',
			script: './app.js',
			env: {
				COMMON_VARIABLE: 'true'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	],

	deploy: {
		production: {
			user: 'root',
			host: '47.96.134.225',
			ref: 'origin/master',
			repo: 'https://github.com/hopelessfree/txclass-crawler.git',
			path: '/www/txclass-crawler/production',
			ssh_options: "StrictHostKeyChecking=no",
			'pre-deploy': 'git fetch --all',
			'post-deploy': 'yarn install && yarn prd && pm2 startOrRestart deploy.config.js --env production'
		}
	}
}