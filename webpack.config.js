var path = require('path');

function production (cfg) {
  cfg = cfg || {};
  var output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'json-refs-min.js'
  };

  var ret = {
    entry: './index.js',
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: 'cover 100%'
                }]
              ]
            }
          }
        }
      ]
    },
    output: output,
  };

  if (cfg.format === 'es') {
    // ret.plugins = [new EsmWebpackPlugin()];
  }
  return ret;
}

module.exports = [{
  devtool: 'inline-source-map',
  entry: './index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/env', {
                targets: 'cover 100%'
              }]
            ]
          }
        }
      }
    ]
  },
  name: 'json-refs',
  optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'json-refs.js',
    library: 'JsonRefs'
  }
}, production()];
