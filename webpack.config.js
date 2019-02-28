const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = env => {
  let config =  {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        inject: false,
      })
    ]
  }
  if (env.development) {
    config = Object.assign({}, config, {
      mode: 'development',
      devtool: 'inline-source-map',
      devServer: {
        contentBase: './dist',
      },
    });
  }
  if (env.production) {
    config = Object.assign({}, config, {
      mode: 'production',
    })
  }

  return config;
};