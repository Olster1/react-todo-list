var webpack = require ('webpack') // gets its locally from the node modules folder
var path = require('path');

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./client/client.js'
	],
	output: {
		path: path.resolve('./dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},

	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],

	module: { 
		loaders: [
			{
				test: /\.js$/, 
				loader: 'babel-loader', 
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015', 'react-hmre'] 
				}
			}
		]
	}
}
