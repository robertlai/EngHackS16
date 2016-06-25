/* eslint no-console: 0 */
const path = require('path');
const request = require('request');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const config = require('./config.js');
const webpackHMR = ['webpack-hot-middleware/client?reload=true'];

for(var entry in webpackConfig.entry) {
	if(webpackConfig.entry.hasOwnProperty(entry)) {
		webpackConfig.entry[entry] = webpackHMR.concat(webpackConfig.entry[entry]);
	}
}

webpackConfig.output.publicPath = 'http://localhost:' + config.port + webpackConfig.output.publicPath;
console.log('Your source maps are using:', config.devtool);
webpackConfig.devtool = config.devtool;
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

const viewPath = webpackConfig.output.publicPath + 'views/';

const compiler = webpack(webpackConfig);
module.exports = function(app) {
	app.use(webpackDevMiddleware(compiler, {
		noInfo: false,
		// display no info to console (only warnings and errors)

		quiet: false,
		// display nothing to the console

		lazy: false,
		// switch into lazy mode
		// that means no watching, but recompilation on every request

		watchOptions: {
			aggregateTimeout: 300,
			poll: false
		},
		// watch options (only lazy: false)

		publicPath: webpackConfig.output.publicPath,
		// public path to bind the middleware to
		// use the same as in webpack

		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	}));

	app.use(webpackHotMiddleware(compiler, {
		log: console.log,
		reload: true
	}));

	/*
		express likes to do lookup for you when you provide a views dir.
		because we are providing views from webpack in memory we need to
		overwrite the view lookup which would normally throw when app.render
		calls with file to render.
	*/
	var View = app.get('view');
	View.prototype.lookup = function(filePath) {
		return filePath;
	};

	app.engine('html', function(filePath, options, callback) {
		const file = path.parse(filePath).base;

		request.get({ method: 'GET', uri: viewPath + file }, function(err, response, body) {
			if(err) { return callback(err); }

			return callback(null, body);
		});
	});
};