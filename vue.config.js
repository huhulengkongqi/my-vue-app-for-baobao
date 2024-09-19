const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',  // 设置为根路径
  outputDir: 'dist' // 构建输出目录
});
