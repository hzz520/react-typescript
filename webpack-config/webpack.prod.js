const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const rimraf = require('rimraf')
const path = require('path')

rimraf.sync(path.resolve(__dirname, '../build'))
rimraf.sync(path.resolve(__dirname, '../lib'))

module.exports = merge(webpackBaseConfig, {
    mode: 'production'
})
