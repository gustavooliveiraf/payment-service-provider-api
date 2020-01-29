const instances = process.env.WEB_CONCURRENCY || -1; // max - 1'
const maxMemory = process.env.WEB_MEMORY || '1G';

module.exports = {
  apps: [{
    name: 'API',
    script: 'index.js',
    exec_mode: 'cluster',
    instances,
    autorestart: true,
    watch: false,
    max_memory_restart: maxMemory,
    env: {
      NODE_ENV: 'production',
    },
  }],
};
