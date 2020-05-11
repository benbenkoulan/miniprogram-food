const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const MpPlugin = require('mp-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { root } = require('./util');

const getPageEntry = pageName => root(`pages/${pageName}/mp.js`);

const isOptimize = true // 是否压缩业务代码，开发者工具可能无法完美支持业务代码使用到的 es 特性，建议自己做代码压缩

module.exports = {
    mode: 'production',
    entry: {
        'miniprogram-app': root('app.js'),
        home: getPageEntry('home'),
        category: getPageEntry('category'),
        my: getPageEntry('my'),
        search: getPageEntry('search'),
        create: getPageEntry('create'),
    },
    output: {
        path: path.resolve(__dirname, '../build/mp/common'), // 放到小程序代码目录中的 common 目录下
        filename: '[name].js', // 必需字段，不能修改
        library: 'createApp', // 必需字段，不能修改
        libraryExport: 'default', // 必需字段，不能修改
        libraryTarget: 'window', // 必需字段，不能修改
    },
    target: 'web', // 必需字段，不能修改
    optimization: {
        runtimeChunk: false, // 必需字段，不能修改
        splitChunks: { // 代码分隔配置，不建议修改
            chunks: 'all',
            minSize: 1000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 100,
            maxInitialRequests: 100,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },

        minimizer: isOptimize ? [
            // 压缩CSS
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.(css|wxss)$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true,
                        },
                        minifySelectors: false, // 因为 wxss 编译器不支持 .some>:first-child 这样格式的代码，所以暂时禁掉这个
                    }],
                },
                canPrint: false
            }),
            // 压缩 js
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
            })
        ] : [],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.css$/,
                exclude: /micro-design/,
                use: [
                    'postcss-loader'
                ],
            },
            {
                test: /\.[t|j]sx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    plugins : [ 
                        ["transform-react-jsx"], 
                        ["class"],
                    ] 
                }
            },
            // {
            //     test: /\.(png|jpg|gif|svg)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[ext]',
            //         publicPath: './images',
            //         outputPath: 'images'
            //     }
            // }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.isMiniprogram': process.env.isMiniprogram, // 注入环境变量，用于业务代码判断
            'process.env.isDev': process.env.NODE_ENV === 'development',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].wxss',
        }),
        new MpPlugin(require('./miniprogram.config')),
        new CopyWebpackPlugin([{
            from: root('assets'),
            to: path.resolve(__dirname, '../build/mp/common/assets')
        }])
    ],
}
