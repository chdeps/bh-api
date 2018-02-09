module.exports = {
    apps: [{
        name: 'bh-api',
        script: './src/index.js'
    }],
    deploy: {
        production: {
            user: 'ubuntu',
            host: 'ec2-13-59-3-213.us-east-2.compute.amazonaws.com',
            key: '~/.ssh/bh-api.pem',
            ref: 'origin/dev',
            repo: 'git@github.com:chdeps/bh-api.git',
            path: '/home/ubuntu',
            'post-deploy': 'yarn && pm2 startOrRestart ecosystem.config.js'
        }
    }
}
