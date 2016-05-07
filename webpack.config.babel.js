import webpack from 'webpack';
import copyFiles from 'copy-webpack-plugin';
import jquery from 'jquery';

module.exports = {
  devtool: "#inline-source-map",
  entry: [
    // Load the babel polyfill so we can use all es6 features
    'babel-polyfill',
    'jquery',
    './src/App.js'
  ],

  output: {
    path: __dirname + '/build/assets',
    filename: 'bundle.js',
    // Tell webpack-dev-server to serve the in memory bundle from the assets directory
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      // Babelify the source JS
      {
        test: /\.js$/,
        exclude: /(node_modules|static)/,
        loader: 'babel-loader'
      },

      // tranform handlebars templates
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          helperDirs: [
            __dirname + '/src/templates/helpers/'
          ]
        }
      }
    ]
  },

  plugins: [
    // Copy the static files to the build dir
    new copyFiles([
      { from: 'static/', to: "../" }
    ]),

    // Shim JQuery for semantic UI
    new webpack.ProvidePlugin({
      jquery: 'jquery',
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}