var config = require('../config.conf');

const defaultSalt = 'HLbxnrwWEr0EFuerYviOGwJ9Bl8Ey2Yo3mFSY2GfucYPuImRgN5zI04kHVQS94DEfKvDE0TXAHuZltyU5uq4Hcw9AOM9TBZ2Ya5I9NZAFxTW';

exports.salt = config.salt || defaultSalt;
exports.mode = process.env.NODE_ENV || config.mode || 'development';
exports.port = (process.env.PORT != null ? process.env.PORT : (config.port || 8085));