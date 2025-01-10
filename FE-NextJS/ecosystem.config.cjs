module.exports = {
  apps: [
    {
      name: 'workflow',
      cwd: './deploy',
      script: 'server.js',
      watch: false,
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
