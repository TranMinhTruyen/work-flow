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
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
