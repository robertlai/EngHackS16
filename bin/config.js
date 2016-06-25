var config = require('../config.conf');

exports.mode = process.env.NODE_ENV || config.mode || 'development';
exports.port = (process.env.PORT != null ? process.env.PORT : (config.port || 8085));