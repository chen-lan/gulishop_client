const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		open: true,
		host: "127.0.0.1",
		proxy: {
			"/api": {
				// 发送目标服务器地址
				target: "http://sph-h5-api.atguigu.cn",
				// pathRewrite: { "^/api": "" },  不需要则需重写替换成空，如果需要则不要替换
			},
		},
	},
	lintOnSave: false,
	pages: {
		index: {
			entry: "src/main.js", // 入口文件
			title: "谷粒商城",
		},
	},
});
