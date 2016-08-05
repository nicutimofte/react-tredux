process.env.NODE_ENV = process.env.NODE_ENV || (process.argv.indexOf('-p') === -1 ? 'development' : 'production');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    path.normalize(__dirname + '/src/index')
  ],
  output: {
    path: path.normalize(__dirname + '/public/js/build'),
    publicPath: 'js/build/',
    library: "account",
    filename: "account.js"
  },
  historyApiFallback: true,
  module: {
    noParse: ['ws'],
    loaders: [
      {
        test: /(\.jsx?$)/,
        //exclude: /(node_modules)/,
        loaders: ['babel'],
        include: path.normalize(__dirname + '/src')
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
      "NODE_ENV":JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.ProvidePlugin({
      React: "React", react: "React", "window.react": "React", "window.React": "React"
    }),
    //new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    alias: {
      "app-config": path.normalize(__dirname + "/src/constants/config." + process.env.NODE_ENV + '.js'),
      'React': 'react',
      'react': 'react'
    },
    root: [
      path.normalize(__dirname + '/src'),
      path.normalize(__dirname + '/node_modules')
    ],
    extensions: ['', '.js', '.jsx']
  },
  // In order for it to work, please require the react library.
  externals: {
  }
};


// If we're in development mode, add the webpack dev server files.
if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = "account.min.js";
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false},
    comments: false
  }));
}