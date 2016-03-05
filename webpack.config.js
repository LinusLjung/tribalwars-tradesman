var webpack = require('webpack'),
	path = require('path');

module.exports = {
	context: __dirname + '/src',
	entry: './app.js',
	output: {
		path: __dirname + '/build',
		filename: 'content.js'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				include: [
					path.resolve(__dirname, 'src'),
				],
				test: /\.js$/,

				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015', 'stage-0']
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	]
};
