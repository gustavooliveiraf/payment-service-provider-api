const instances = process.env.WEB_CONCURRENCY || -1; // max - 1'
const maxMemory = process.env.WEB_MEMORY || '1536M'; // assuming that the memory is 2g

module.exports = {
  apps: [{
    name: 'api',
    script: 'index.js',
    exec_mode: 'cluster',
    instances,
    autorestart: true,
    watch: false,
    max_memory_restart: maxMemory, // dev: process.memoryUsage()
    node_args: '--max_old_space_size=1536', // assuming that the memory is 2g
    env: {
      NODE_ENV: 'production',
    },
  }, {
    name: 'email-worker',
    script: 'src/workers/email/index.js',
    autorestart: true,
    watch: false,
    max_memory_restart: maxMemory,
    node_args: '--max_old_space_size=1536',
    env: {
      NODE_ENV: 'production',
    },
  }],
};
