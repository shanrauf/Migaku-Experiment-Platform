const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');

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
  new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
  new VueLoaderPlugin(),
  new VuetifyLoaderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new FriendlyErrorsPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: 'index.html',
    minify: {
      collapseWhitespace: true
    },
    hash: true,
    inject: true,
    serviceWorkerLoader: `<script>${fs.readFileSync(
      path.join(
        __dirname,
        ifDevElseProd(
          './scripts/service-worker-dev.js',
          './scripts/service-worker-prod.js'
        )
      ),
      'utf-8'
    )}</script>`
  })
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

const devServer = {
  historyApiFallback: true,
  // contentBase: path.join(__dirname, 'build'),
  open: 'chrome',
  proxy: {
    '/api': 'http://localhost:3000'
  },
  compress: ifDevElseProd(false, true), // gzip
  stats: {
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: false,
    builtAt: false,
    errorDetails: false,
    entrypoints: false,
    warnings: ifDevElseProd(false, true),
    performance: { hints: ifDevElseProd(false, true) },
    publicPath: false
  },
  port: 8080,
  // host: '0.0.0.0', Uncomment when want to host on your router (assuming already port-forwarded)
  hot: true,
  quiet: true
};

const optimization = {
  minimize: true,
  namedModules: false,
  runtimeChunk: 'single',
  noEmitOnErrors: true,
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
          inline: 2
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
  target: 'web',
  devtool: ifDevElseProd('cheap-module-eval-source-map', undefined),
  devServer: devServer,
  entry: {
    main: './src/main.ts'
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.runtime.js',
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader?cacheDirectory'
        }
      },
      {
        test: /\.(css)$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers')
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false // error with file loader 5.0.2, # https://github.com/webpack-contrib/html-loader/issues/203
            }
          }
        ]
      }
    ]
  },
  plugins: plugins,
  output: {
    path: path.join(__dirname, 'build'),
    pathinfo: false,
    filename: '[name].bundle.js',
    chunkFilename: 'chunks/[chunkhash].chunk.js',
    publicPath: '/'
  },
  optimization: ifDevElseProd({}, optimization)
};
