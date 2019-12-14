const webpack = require("webpack");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

function ifUtil(NODE_ENV) {
  return (dev_value, prod_value) => {
    if (NODE_ENV == "development") {
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
  new webpack.EnvironmentPlugin(["NODE_ENV", "DEBUG"]),
  new VueLoaderPlugin(),
  new VuetifyLoaderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new FriendlyErrorsPlugin(),
  new CopyPlugin(
    [{ from: "src/assets/images/favicon.ico", to: "assets/images" }],
    {
      copyUnmodified: true
    }
  ),
  new HtmlWebpackPlugin({
    template: "src/index.html",
    filename: "index.html",
    minify: {
      collapseWhitespace: true
    },
    hash: true,
    inject: true
  })
];

if (process.env.BUNDLE_ANALYZER) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
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
  contentBase: path.join(__dirname, "build"),
  open: "chrome",
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
  runtimeChunk: "single",
  noEmitOnErrors: true,
  splitChunks: {
    hidePathInfo: true,
    chunks: "all",
    automaticNameDelimiter: "-",
    maxAsyncRequests: 5,
    maxInitialRequests: 3
  },
  minimizer: [
    new UglifyJsPlugin({
      uglifyOptions: {
        parallel: true,
        cache: false,
        warnings: false,
        comments: false,
        compress: {
          drop_console: ifDevElseProd(false, true),
          inline: false,
          collapse_vars: ifDevElseProd(false, true)
        },
        parse: {},
        mangle: true,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_fnames: false,
        output: {
          comments: false
        }
      }
    })
  ]
};

module.exports = {
  mode: ifDevElseProd("development", "production"),
  target: "web",
  devtool: "cheap-module-eval-source-map",
  devServer: devServer,
  entry: {
    main: "./src/main.js"
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue$: "vue/dist/vue.runtime.js",
      "@": path.resolve(__dirname, "./src")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader?cacheDirectory"
        }
      },
      {
        test: /\.(css)$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers")
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader?name=[name].[ext]"]
      },
      {
        test: /\.(ico|eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: plugins,
  output: {
    path: path.join(__dirname, "build"),
    pathinfo: false,
    filename: "[name].bundle.js",
    chunkFilename: "chunks/[chunkhash].chunk.js",
    publicPath: "/"
  },
  optimization: ifDevElseProd({}, optimization)
};
