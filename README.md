## 一个简单的 webpack 应用

1. 项目初始化
```javascript
npm init
```

2. 安装 webpack、webpack-cli
```javascript
npm i -D webpack
npm i -D webpack-cli
```

3. 修改 package.json 的 NPM Script
```javascript
"scripts": {
	"start": "webpack --config webpack.config.js"
}
```

4. 创建 webpack.config.js 文件
```javascript
const path = require('path')

module.exports = {
	entry: './main.js',
	ouput: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist')
	}
}
```

5. 使用（Loader）css，创建一个 .css 文件 main.css
```javascript
#app {
	text-align: center
}
```

6. 在 main.js 中引入
```javascript
require('./main.css')
```

7. 配置 loader，在 webpack.config.js
```javascript
module: {
	rules: [
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}
	]
}
```
loader 用于文件的转化，module.rules 数组中配置了一组规则，告诉 webpack 在与遇到哪些文件时使用哪些 loader 去加载和转换。
配置 loader 注意点：
- use 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的。
- 每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如 css-loader ? minimize 则告诉 css-loader 要开启 css 压缩，不过 webpack 4.0 之后需要借助 plugin 来实现 css 压缩

8. 引入 loader
```javascript
npm i -D style-loader css-loader
```

9. 引入 plugin optimize-css-assets-webpack-plugin
```javascript
npm i -D optimize-css-assets-webpack-plugin
```

10. 配置 plugin
```javascript
const OptimizeCssAssetsPlugin = require('optimize-css-assets-wepack-plugin')

module.exports = {
	plugins: [
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
```

再次运行 NPM Script 的时候，打开 bundle.js，会发现 css 被转化成文本的形式，通过 JS 动态地往 DOM 中插入，并且，运行 index.html 的时候，发现 css 会以 style 标签的形式插入到 head 中。这种方式如果 bundle.js 文件大小如果很大，就会发生加载 js 缓慢影响页面加载。

11. 使用 extrac-text-webpack-plugin 插件
```javascript
npm i -D extract-text-webpack-plugin
```

12. 配置 extract-text-webpack-plugin
```javascript
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
	})
]
```

13. 引入 html-webpack-plugin
```javascript
npm i -D html-wepack-plugin
```

14. 配置 html-webpack-plugin
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

plugins: [
	new HtmlWebpackPlugin()
]
```

15. 使用 DevServer
```javascript
npm i -D webpack-dev-server
```
