const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	// javascript 执行入口文件
	entry: './main.js',
	output: {
		// 把所有依赖的模块合并输出到一个 bundle.js 文件
		filename: 'bundle.js',
		// 输出文件都放到 dist 目录下
		path: path.resolve(__dirname, './dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: `[name]_[md5:contenthash:hex:8].css`
		}),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g, // 匹配资源文件名
			cssProcessor: require('cssnano'), // 压缩优化的css处理器
			cssProcessorPluginOptions: { // css 处理器的配置项，具体可查看相对应 css 处理器的文档
				preset: ['default', {discardComments: {removeAll: true}}]
			},
			canPrint: true
		})
	]
}