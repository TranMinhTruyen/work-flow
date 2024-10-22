// pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'workflow',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: './',
      watch: true,
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
