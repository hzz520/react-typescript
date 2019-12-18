const path = require('path')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV === 'development'
const BASE = require('../.base.js') || 'lipei'

const templateFunction = function (data) {
    // console.log(data.sprites);
    const rita = 2
    const shared = '.w-icon { background-image: url(I); background-size: WSMpx HSMpx; }'
        .replace('I', (data.sprites[0] || {}).image)
        .replace('WSM', data.spritesheet.width / rita)
        .replace('HSM', data.spritesheet.height / rita)
    // 注意：此处默认图标使用的是二倍图
    const perSprite = data.sprites.map(function (sprite) {
      // background-size: SWpx SHpx;
      return '.w-icon-N { width: Wpx; height: Hpx; }\n.w-icon-N .w-icon, .w-icon-N.w-icon { width: Wpx; height: Hpx; background-position: Xpx Ypx;}'
        .replace(/N/g, sprite.name)
        .replace(/W/g, sprite.width / rita)
        .replace(/H/g, sprite.height / rita)
        .replace(/X/g, sprite.offset_x / rita)
        .replace(/Y/g, sprite.offset_y / rita);
    }).join('\n');
  
    return shared + '\n' + perSprite;
}

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/index.tsx')
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: devMode ? `${BASE}/js/[name].js` : `${BASE}/js/[name].[chunkhash].js`,
        publicPath: devMode ? '/' : '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.less', '.json', '.css'],
        alias: {
            "@": path.resolve(__dirname, '../src')
        }
    },
    optimization: {
        namedChunks: true,
        moduleIds: 'hashed',
        minimizer: [
            new TerserJSPlugin({
                extractComments: true,
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ],
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              },
              vendors: {
                name: 'vendor',
                chunks: 'all',
                test: /[\\/]node_modules[\\/]/,
                priority: -10
              }
            }
        }
    },
    module: {
        rules: [
            { 
                test: /\.(j|t)sx?$/, 
                include: path.resolve(__dirname, '../src'),
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader"
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            publicPath: `/${BASE}/css`
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'medias/[name].[hash:7].[ext]',
                    publicPath: '/' + BASE
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[contenthash:7].[ext]',
                    publicPath: '/' + BASE
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'imgs/[name].[hash:7].[ext]',
                    publicPath: '/' + BASE
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BASE': JSON.stringify(BASE)
        }),
        new HtmlWebpackPlugin({
            filename: `${BASE}/index.html`,
            inject: true,
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: `${BASE}/[name]${devMode ? '' : '.[contenthash]'}.css`,
            ignoreOrder: false
        }),
        new SpritesmithPlugin({
            //设置源icons,即icon的路径，必选项
            src: {
              cwd: path.resolve(__dirname, '../src/assets/imgs/spriteIcons'),
              glob: '*.png'
            },
            //设置导出的sprite图及对应的样式文件，必选项
            target: {
              image: path.resolve(__dirname, '../src/assets/imgs/sprites/sprite.png'),
              css: [[path.resolve(__dirname, '../src/assets/css/sprite.less'), {format: 'function_based_template'}]]  //也可以为css, sass文件，需要先安装相关loader
            },
            customTemplates: {
                'function_based_template': templateFunction,
            },
            //设置sprite.png的引用格式
            apiOptions: {
              cssImageRef: '~@/assets/imgs/sprites/sprite.png'  //cssImageRef为必选项
            },
            //配置spritesmith选项，非必选
            spritesmithOptions: {
                padding: 10,
            //   algorithm: 'binary-tree'//设置图标的排列方式
                algorithm: 'top-down'
            }
        }),
        new OptimizeCSSAssetsPlugin({})
    ]
}
