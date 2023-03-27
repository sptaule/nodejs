module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      error_file: './logs/err.log',
      max_memory_restart: '200M',
      instances: 3,
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
