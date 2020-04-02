const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
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

const entries = glob.sync("./src/pages/*/index.js");
const map = Object.create(null);
let plugs = [];
entries.map(entry => {
	const p = entry.match(/pages\/(\w+)\/index.js$/i)[1]
	map[p] = entry;
	plugs.push(new HtmlWebpackPlugin({
		filename: `${p}.html`,
		// template: `src/pages/${p}/index.html`,
		chunks: [p]
	}))
});
// console.log(map)

module.exports = {
	mode: 'development',

	entry: map,

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
		new webpack.ProvidePlugin({
			PIXI: 'pixi.js'
		}),
		new CleanWebpackPlugin(),
		new webpack.ProgressPlugin(),
		...plugs,
		new CopyPlugin([
			{ from: 'src/assets', to: 'assets' }
		])
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
			// {
			// 	test: /\.(png|jpg|gif)$/i,
			// 	use: [
			// 		{
			// 			loader: 'url-loader',
			// 			options: {
			// 			limit: 8192,
			// 			},
			// 		},
			// 	],
			// }
		]
	},

	optimization: {
		// splitChunks: {
		// 	cacheGroups: {
		// 		vendors: {
		// 			priority: -10,
		// 			test: /[\\/]node_modules[\\/]/
		// 		}
		// 	},

		// 	chunks: 'async',
		// 	minChunks: 1,
		// 	minSize: 30000,
		// 	name: true
		// }
	},

	devServer: {
		open: true,
		writeToDisk: true,
		public: 'gamemaker.weixin.qq.com'
	},

	devtool: 'cheap-module-eval-source-map'
};
