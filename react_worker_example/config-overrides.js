const WorkerPlugin = require("worker-plugin");

module.exports = {
  webpack: function(config, env) {
    //web-worker
    config.plugins.push(new WorkerPlugin());

    return config;
  }
};
