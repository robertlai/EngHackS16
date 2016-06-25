/* eslint no-console: 0 */

var config = require('./config');

for(var i = 0; i < process.argv.length; i++) {
	switch(process.argv[i]) {
		case '--port':
		case '-p':
			i++;
			config.port = parseInt(process.argv[i]) || config.port;
			console.log('OVERRIDDEN PORT', config.port);
			break;
		case '--prod':
		case '-prod':
			config.mode = 'production';
			break;
	}
}