/* eslint no-console: 0 */

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = (JSON.stringify(process.env.NODE_ENV) === JSON.stringify('production'));
const CACHE_DIR = process.env.CACHE_DIR === 'true' ? true : false;

const vendorScripts = [
	'lodash',
	'react',
	'react-dom'
];

var plugins = [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'common',
		chunks: ['main']
	}),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: Infinity
	}),
	new HtmlWebpackPlugin({
		filename: 'views/index.html',
		template: 'views/main.html',
		environment: '/environment',
		favicon: 'assets/favicon.ico',
		inject: 'body',
		chunksSortMode: 'dependency',
		chunks: ['vendor', 'common', 'main']
	})
];

if(PRODUCTION) {
	plugins = plugins.concat([
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
				dead_code: true,
				drop_debugger: true,
				drop_console: true,
				conditionals: true
			}
		}),
		new webpack.optimize.DedupePlugin()
	]);
}

const webpackConfig = {
	entry: {
		main: './src/main.js',
		vendor: vendorScripts
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js',
		chunkFilename: '[id].[chunkhash].chunk.js',
		publicPath: '/'
	},
	module: {
		noParse: [
			path.resolve(__dirname, 'node_modules/lodash/index.js')
		],
		loaders: [
			{
				test: [/\.js$/, /\.jsx/],
				include: path.join(__dirname, 'src'),
				exclude: [
					path.resolve(__dirname, 'node_modules'),
					path.resolve(__dirname, 'assets/font')
				],
				loader: 'babel-loader',
				query: {
					cacheDirectory: CACHE_DIR,
					babelrc: true
				}
			},
			{
				test: /\.scss$/,
				loaders: [
					'style-loader',
					'css-loader?-autoprefixer&-minimize',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				loaders: [
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: [/\.svg$/, /\.eot$/, /\.ttf$/, /\.woff$/],
				loader: 'url-loader'
			},
			{
				test: [/\.png$/, /\.gif$/, /\.jpg$/,  /\.xcf$/],
				loader: 'file-loader?name=images/[name].[ext]'
			}
		]
	},
	postcss: function() {
		return [
			autoprefixer({ browsers: ['last 5 versions', 'ie 10'] })
		];
	},
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, 'assets/styles/sass')
		]
	},
	resolve: {
		root: [
			path.resolve(__dirname, 'src'),
			path.resolve(__dirname, 'assets/styles/sass'),
			path.resolve(__dirname, 'assets'),
			path.resolve(__dirname, 'node_modules')
		],
		extenstions: [ '', '.js', '.json', '.scss' ]
	},
	plugins: plugins
};

module.exports = webpackConfig;