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
		quiet: false,
		lazy: false,
		watchOptions: {
			aggregateTimeout: 300,
			poll: false
		},
		publicPath: webpackConfig.output.publicPath,
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