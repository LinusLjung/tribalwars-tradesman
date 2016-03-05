var webpack = require('webpack'),
	path = require('path');

module.exports = {
	context: __dirname + '/src',
	entry: {
		content: './content.js',
		popup: './popup.js',
		background: './background.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [
					path.resolve(__dirname, 'src'),
				],

				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015', 'stage-0']
				}
			},
			{
				test: /\.jade$/,
				loader: 'jade'
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	],
	externals: {
		chrome: 'chrome'
	}
};
