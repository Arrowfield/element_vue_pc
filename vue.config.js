module.exports = {
    publicPath: './',
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    chainWebpack: config => {
        // remove the prefetch plugin
        config.plugins.delete('prefetch')

    },
    devServer:{
        host:"dev.admin.com",
        port:"80"
    }
}
