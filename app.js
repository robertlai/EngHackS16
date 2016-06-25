/* eslint no-console: 0 */

process.on('uncaughtException', function (err) {
	console.log('\n NodeJS Exception!');
	console.log((err && err.stack) || err);
});

require('./bin/parseArgs');
const path = require('path');
const http = require('http');
const express = require('express');
const routes = require('./bin/controllers/index');

var config = require('./bin/config');

const app = express();
app.use(express.compress());

const assetsroot = 'dist';
const viewEngine = require('./bin/viewEngine');
app.enable('view cache');
app.engine('html', viewEngine);
app.set('views', path.join(__dirname, assetsroot, 'views'));
app.set('view engine', 'html');

if (config.mode !== 'production') {
	require('./bin/dev.js')(app);
}

app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());

app.use(express.static(path.join(__dirname, assetsroot)));

app.get('/health', function(req, res) {
	res.send(200);
});

app.get('*', function(req, res, next) {
	if(req.headers['x-forwarded-proto'] === 'http') {
		res.redirect('https://' + req.headers.host + req.url);
	} else {
		next('route');
	}
});

routes(app);

console.log('\n App');

console.log('\n Started the server.\n\
   mode: ' + config.mode + '\n   port: ' + config.port + '\n');
http.createServer(app).listen(config.port);