const config = require('../config');

module.exports = function(app) {
	app.get('/environment', GetEnvironment);
	app.get('*', GetIndex);
};

function GetIndex(req, res) {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
	res.set('Expires', 'Thu, 1 January 1970 00:00:00 GMT');

	res.render('index.html');
}

function GetEnvironment(req, res) {
	const environment = {
		langHeader: req.get('accept-language'),
		hosts: config.hosts,
		mode: config.mode,
		MOBILE: !!(/mobile/i.test(req.get('user-agent')))
	};

	const javascript = 'window.MI = ' + JSON.stringify(environment) + ';';
	res.set('Content-Type', 'application/javascript');
	res.send(javascript);
}