const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

function ifUtil(NODE_ENV) {
  return (dev_value, prod_value) => {
    if (NODE_ENV == 'development') {
      return dev_value;
    } else {
      return prod_value;
    }
  };
}

const ifDevElseProd = ifUtil(process.env.NODE_ENV);

const plugins = [
  new CleanWebpackPlugin({
    // Write Logs to Console
    verbose: ifDevElseProd(true, false),

    // Automatically remove all unused webpack assets on rebuild
    cleanStaleWebpackAssets: true,

    // Do not allow removal of current webpack assets
    protectWebpackAssets: false
  }),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new FriendlyErrorsPlugin()
];

if (process.env.BUNDLE_ANALYZER) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

  plugins.push(
    new BundleAnalyzerPlugin({
      openAnalyzer: true,
      analyzerPort: 9999,
      generateStatsFile: false,
      statsOptions: {
        exclude: /node_modules/,
        errors: false,
        warnings: false,
        errorDetails: false,
        reasons: false,
        cached: false,
        cachedAssets: false
      }
    })
  );
}

const optimization = {
  minimize: true,
  namedModules: true,
  // runtimeChunk: 'single',
  noEmitOnErrors: false,
  splitChunks: {
    hidePathInfo: true,
    chunks: 'all',
    automaticNameDelimiter: '-',
    maxAsyncRequests: 5,
    maxInitialRequests: 3
  },
  minimizer: [
    new UglifyJsPlugin({
      uglifyOptions: {
        parallel: true,
        cache: false,
        warnings: true,
        comments: false,
        compress: {
          drop_console: false,
          inline: false,
          collapse_vars: false
        },
        parse: {},
        mangle: true,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_fnames: true,
        output: {
          comments: false
        }
      }
    })
  ]
};

module.exports = {
  mode: ifDevElseProd('development', 'production'),
  target: 'node',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './src/app.ts'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      }
    ]
  },
  plugins: plugins,
  output: {
    path: path.join(__dirname, 'build'),
    pathinfo: false,
    filename: 'app.js',
    chunkFilename: 'chunks/[chunkhash].chunk.js',
    publicPath: '/'
  },
  externals: [nodeExternals()],
  optimization: ifDevElseProd({}, optimization)
};
