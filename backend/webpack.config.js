const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

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
  noEmitOnErrors: false,
  splitChunks: {
    hidePathInfo: true,
    chunks: 'all',
    automaticNameDelimiter: '-',
    maxAsyncRequests: 5,
    maxInitialRequests: 3
  },
  minimizer: [
    new TerserPlugin({
      test: /\.js(\?.*)?$/i,
      terserOptions: {
        parse: {
          // we want terser to parse ecma 8 code. However, we don't want it
          // to apply any minfication steps that turns valid ecma 5 code
          // into invalid ecma 5 code. This is why the 'compress' and 'output'
          // sections only apply transformations that are ecma 5 safe
          // https://github.com/facebook/create-react-app/pull/4234
          ecma: 8
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: true,
          inline: 2,
          drop_console: true
        },
        mangle: {
          safari10: true
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true
        }
      },
      cache: true,
      parallel: true,
      sourceMap: true // Must be set to true if using source-maps in production
    })
  ]
};

module.exports = {
  mode: ifDevElseProd('development', 'production'),
  target: 'node',
  devtool: ifDevElseProd('cheap-module-eval-source-map', undefined),
  entry: {
    main: './src/server.ts'
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
    filename: 'server.js',
    chunkFilename: 'chunks/[chunkhash].chunk.js',
    publicPath: '/'
  },
  externals: [nodeExternals()],
  optimization: ifDevElseProd({}, optimization)
};
