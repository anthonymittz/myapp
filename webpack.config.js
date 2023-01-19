const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

/* On loaders
  < webpack 5:
    - raw-loader: import file as string
    - url-loader: inline file as data URI
    - file-loader: emit file to output dir

  > webpack 5: { test: /\.png/, type: 'asset/resource' }
    - asset/resource: emit file, export URL
    - asset/inline: inline file as data URI
    - asset/source: import file as string
    - asset: export data URI || emit a separate file
*/

const use = {
  publicPath: '/myapp',
  publicPathDev: '/',
  staticDir: path.join(__dirname, 'public'),
  outputDir: path.join(__dirname, 'docs'),
  htmlTemplate: path.join(__dirname, 'src', 'index.html'),
  entryFile: path.join(__dirname, 'src', 'index.js'),
};

function configure(_, argv) {
  const mode = argv.mode || 'production';
  const isProduction = mode === 'production';
  console.log(`[webpack] Running in ${mode} mode`);
  
  /** @type {import('webpack').Configuration} */
  const config = {
    mode,
    devServer: {
      port: 3000,
      historyApiFallback: isProduction ? { rewrites: [{ from: /\//, to: '/404.html' }] } : true,
      static: use.staticDir,
      watchFiles: ['./src/**/*.js', './assets/*'],
    },
    entry: use.entryFile,
    output: {
      path: use.outputDir,
      publicPath: 
        isProduction ? use.publicPath : use.publicPathDev,
      filename: 
        isProduction ? '[name].bundle.js' : '[name].[hash].js',
      chunkFilename: 
        isProduction ? '[name].bundle.js' : '[name].[hash].js',
    },
    plugins: [
      new HtmlWebpackPlugin({template: use.htmlTemplate}),
      new MiniCssExtractPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {presets: ['@babel/preset-env', '@babel/preset-react']}
          }
        },
        {
          test: /\.css$/,
          use: [ isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader' ]
        },
        {
          test: /\.(sass|scss)$/,
          use: [ isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader' ],
        },
        {
          test: /\.svg/,
          type: 'asset/inline',
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true
          }
        }
      },
    },
  };

  return config;
}


module.exports = configure;