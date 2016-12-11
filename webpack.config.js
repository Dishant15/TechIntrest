var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var plugins = [
  new BundleTracker({filename: './backend/webpack-stats.json'}), 
  new ExtractTextPlugin('[name].css', {allChunks: false})
];

var entry = [
  "./frontend/react/main",
  "./frontend/sass/main"
];

var output = {
  path: __dirname + "/backend/static/",
};

var js_loader = {
  test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    include: [
      path.resolve(__dirname, "frontend/react")
    ],
};

var query = {
  presets: ['react', 'es2015', 'stage-0'],
  plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
};

var out_file;
var sass_loader;

if(debug){
  // development build
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );

  out_file = "[name].js";     // no hash on output js names
  sass_loader = 'css?sourceMap!sass?sourceMap';     // no minification of css

  // go for hot reload with react
  entry.push(
    'webpack-dev-server/client?http://localhost:8001',
    'webpack/hot/only-dev-server'
  );

  output['publicPath'] = 'http://localhost:8001/backend/static';
  output['filename'] = out_file;

  js_loader['loaders'] = ['react-hot','babel-loader?'+JSON.stringify(query)];

} else {
  // production build
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  );

  // out_file = "[name]-[hash].js";    // add hash to the file name
  out_file = "[name].js";
  sass_loader = 'css?sourceMap!csso-loader!sass?sourceMap';

  // No react hot loader
  js_loader['loader'] = 'babel-loader';
  js_loader['query'] = query;

  output['filename'] = out_file;
}

module.exports = {

  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,

  entry: entry,

  module: {
    loaders: [
      js_loader, 
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
              'style', // The backup style loader
              sass_loader
          )
      }
    ]
  },

  resolve: {
    //tells webpack where to look for modules
    modulesDirectories: ['node_modules'],
    //extensions that should be used to resolve modules
    extensions: ['', '.js', '.jsx', '.scss'] 
  },

  output: output,

  plugins: plugins,

};