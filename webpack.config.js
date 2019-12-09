const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {
	mode: 'development',

	entry: {
		index: './src/pages/index/index.js',
		collision: './src/pages/test/index.js',
		phaser: './src/pages/phaser/index.js',
		outline: './src/pages/outline/index.js'
	},

	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src') 
		}
	},
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new CleanWebpackPlugin(),
		new webpack.ProgressPlugin(),
		new CopyPlugin([
			{ from: './src/assets', to: 'assets' }
		]),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/pages/index/index.html',
			chunks: ['index']
		}),
		new HtmlWebpackPlugin({
			filename: 'outline.html',
			template: 'src/pages/outline/index.html',
			chunks: ['outline']
		}),
		new HtmlWebpackPlugin({
			filename: 'test.html',
			template: 'src/pages/test/index.html',
			chunks: ['collision']
		}),
		new HtmlWebpackPlugin({
			filename: 'phaser.html',
			template: 'src/pages/phaser/index.html',
			chunks: ['phaser']
		})
	],

	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
						limit: 8192,
						},
					},
				],
			}
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: true,
		writeToDisk: true,
		public: 'gamemaker.weixin.qq.com'
	},

	devtool: 'cheap-module-eval-source-map'
};
