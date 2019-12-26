const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base');
const BASE = require('../.base.js') || 'lipei'

const webpackDevConfig = {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        inline: true,
        progress: true,
        open: true,
        openPage: BASE,
        contentBase: path.resolve(__dirname, `../build`),
        compress: true,
        hot: true,
        host: '0.0.0.0',
        useLocalIp: true,
        disableHostCheck: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: new RegExp(`^/${BASE}([a-zA-Z0-9\/]{1,})`, 'g'),
                    to: `/${BASE}/index.html`
                }
            ]
        },
        port: 8081
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(webpackBaseConfig, webpackDevConfig)
