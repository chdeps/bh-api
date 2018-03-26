module.exports = {
    apps: [{
        name: 'bh-api',
        script: './src/index.js'
    }],
    deploy: {
        staging: {
            user: 'ubuntu',
            host: 'ec2-13-59-3-213.us-east-2.compute.amazonaws.com',
            key: '~/.ssh/bh-api.pem',
            ref: 'origin/feature/setupPM2',
            repo: 'git@github.com:chdeps/bh-api.git',
            path: '/home/ubuntu',
            'post-deploy': 'npm install && npm run restart'
        }
    }
}



