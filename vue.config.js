const path = require('path')
// const PurifyCSSPlugin = require('purifycss-webpack')
// const glob = require('glob-all')

function resolveRealPath(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	//  "baseUrl" option in vue.config.js is deprecated now, please use "publicPath" instead.
	publicPath: '',
	productionSourceMap: false,
	lintOnSave: false,
	outputDir: 'yuansheng_web_nzjc_dist', // 输出文件目录
	devServer: {
		port: 6925,
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/styles/variables.scss";`
			}
		}
	},
	chainWebpack: config => {
		const svgRule = config.module.rule('svg') // 找到svg-loader
		svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
		svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
		svgRule // 添加svg新的loader处理
			.test(/\.svg$/)
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})

		const imagesRule = config.module.rule('images')
		imagesRule.exclude.add(resolveRealPath('src/icons'))
		config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
	},
}
