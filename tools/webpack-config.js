'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const pkgJson = require('../package.json');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin-hash');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
module.exports = type => {
  const isDev = type === 'dev';
  const isDist = type === 'dist';

  const cssLoaders = [
    {
      loader: require.resolve('css-loader'),
      options: { minimize: isDist }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        plugins: [require('autoprefixer'), require('postcss-discard-comments')]
      }
    },
    require.resolve('sass-loader')
  ];
  const scssLoaders = [
    {
      loader: require.resolve('css-loader'),
      options: { minimize: isDist }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        plugins: [require('autoprefixer'), require('postcss-discard-comments')]
      }
    },
    require.resolve('sass-loader')
  ];
  const lessLoaders = [
    {
      loader: require.resolve('css-loader'),
      options: { minimize: isDist }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        plugins: [require('autoprefixer'), require('postcss-discard-comments')]
      }
    },
    {
      loader: require.resolve('less-loader'),
      options: {
        javascriptEnabled: true
      }
    }
  ];

  return {
    mode: type === 'dev' ? 'development' : 'production',
    devtool: {
      dev: 'inline-source-map',
      dll: false,
      test: false,
      dist: false
    }[type],
    resolve: {
      alias: {},
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.scss', '.less', '.css']
    },
    entry: _.compact([
      isDev && 'react-hot-loader/patch',
      isDev && `webpack-hot-middleware/client?http://127.0.0.1:${config.port}`,
      isDev && 'webpack/hot/only-dev-server',
      './src/index',
      './src/style/index',
      './src/style/antd.less'
    ]),
    output: {
      publicPath: '',
      filename: isDist
        ? `bundle/${pkgJson.version}/[name].[hash].js`
        : `bundle/${pkgJson.version}/[name].js`,
      chunkFilename: isDist
        ? `bundle/${pkgJson.version}/module.[name].[hash].js`
        : `bundle/${pkgJson.version}/module.[name].js`,
      path: path.join(config.webpack.path.pub)
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'lrz': 'window.lrz',
      'tagcloud': 'window.tagcloud',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10
          },
          common: {
            chunks: 'initial',
            name: 'common',
            minSize: 0
          },
          styles: {
            name: 'styles',
            test: /\.scss|less|css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    plugins: _.compact([
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev &&
      new HtmlWebpackPlugin({
        title: pkgJson.title,
        template: './src/templates/index.ejs',
        filename: 'index.html'
      }),
      isDist &&
      new HtmlWebpackPlugin({
        title: pkgJson.title,
        template: './src/templates/index.production.ejs',
        filename: 'index.html'
      }),
      isDev &&
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      isDist &&
      new MiniCssExtractPlugin({
        filename: `bundle/${pkgJson.version}/[name].css`,
        chunkFilename: `bundle/${pkgJson.version}/[name].[contenthash:12].css`
      }),
      isDev &&
      new WebpackNotifierPlugin({
        title: pkgJson.title
      }),
      new CopyWebpackPlugin([
        {
          from: config.webpack.path.src + '/assets/',
          to: 'assets/'
        },
        {
          from: config.webpack.path.src + '/lib/',
          to: 'lib/'
        },
        {
          from: config.webpack.path.src + '/config.json',
          to: './'
        },
        {
          from: config.webpack.path.src + '/favicon.ico',
          to: './'
        }
      ]),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: [
          'lib/react.production.min.js',
          'lib/react-dom.production.min.js',
          'lib/up2upyun.js',
          'lib/lrz.js',
          'lib/base64.js',
          'lib/md5.js',
          'lib/jquery.js',
          'lib/tagcloud.js'
        ],
        append: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          version: `"${pkgJson.version}"`
        }
      })
    ]),
    module: {
      rules: _.compact([
        {
          test: /\.(tsx?|jsx?)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  libraryName: 'antd',
                  libraryDirectory: 'lib'
                })
              ]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: isDist
            ? [MiniCssExtractPlugin.loader, ...cssLoaders]
            : ['style-loader', ...cssLoaders]
        },
        {
          test: /\.scss$/,
          use: isDist
            ? [MiniCssExtractPlugin.loader, ...scssLoaders]
            : ['style-loader', ...scssLoaders]
        },
        {
          test: /\.less$/,
          use: isDist
            ? [MiniCssExtractPlugin.loader, ...lessLoaders]
            : ['style-loader', ...lessLoaders]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: ['url-loader?limit=1&name=img/[name].[ext]'],
          include: path.resolve(config.webpack.path.src)
        },
        {
          test: /\.(eot|ttf|woff)$/i,
          loaders: ['url-loader?name=font/[name].[ext]']
        }
      ])
    }
  };
};
