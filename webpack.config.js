const webpack = require("webpack");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

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

module.exports = {
  mode: process.env.NODE_ENV,
  target: "web",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    open: "chrome",
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
      warnings: false,
      publicPath: false
    },
    port: 8080,
    // host: '0.0.0.0', Uncomment when want to host on your router (assuming already port-forwarded)
    hot: true,
    quiet: true
  },
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
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
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
              implementation: require("sass")
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico|svg|woff|woff2|eot|ttf|otf)$/i,
        loaders: ["file-loader?name=[name].[ext]"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      // Write Logs to Console
      verbose: ifDevElseProd(true, false),

      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,

      // Do not allow removal of current webpack assets
      protectWebpackAssets: false
    }),
    new VuetifyLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new webpack.EnvironmentPlugin(["NODE_ENV", "DEBUG"]),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      hash: true
    })
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    //   generateStatsFile: false,
    //   statsOptions: {
    //     exclude: /node_modules/,
    //     errors: false,
    //     warnings: false,
    //     errorDetails: false,
    //     reasons: false,
    //     cached: false,
    //     cachedAssets: false
    //   }
    // })
  ],
  output: {
    pathinfo: false,
    filename: "[name].js",
    chunkFilename: "chunks/[chunkhash].chunk.js",
    publicPath: "/"
  },
  optimization: {
    minimize: ifDevElseProd(false, true),
    namedModules: ifDevElseProd(true, false),
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
            inline: false
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
  }
};
