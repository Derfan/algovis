const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const PATHS = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src'),
  static: path.join(__dirname, 'public'),
};

module.exports = (_, { mode }) => {
  const isDevEnv = mode === 'development';
  const config = {
    entry: path.join(PATHS.src, 'index.js'),
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.js', '.json'],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(PATHS.static, 'index.html'),
      }),
      new CompressionPlugin(),
    ],
    output: {
      filename: '[name].bundle.js',
      path: PATHS.build,
    },
  };

  if (isDevEnv) {
    Object.assign(config, {
      devtool: 'source-map',
      devServer: {
        contentBase: PATHS.build,
        compress: true,
        port: 9000,
        open: false,
        headers: { 'Access-Control-Allow-Origin': '*' },
        publicPath: '/',
      },
    });
  }

  return config;
};
