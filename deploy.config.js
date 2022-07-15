module.exports = {
	app: [
    {
    	name: 'txclass-crawler',
    	script: 'app.js',
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
			repo: 'https://github.com/hopelessfree/txclass-manager.git',
			path: '/www/txclass-crawler/production',
			'pre-deploy': 'git fetch --all',
			'post-deploy': 'npm install && npm run prd && pm2 startOrRestart deploy.config.js --env production'
		}
	}
}