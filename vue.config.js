var path = require('path');
module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				src: path.resolve(__dirname, 'src')
			}
		},
		module: {
			rules: [{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/,
				query: {
					plugins: ['lodash'],
					presets: [['@babel/env', { 'targets': { 'node': 6 } }]]
				}
			}]
		}
	}
}