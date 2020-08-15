import path from "path";
import webpack from "webpack";
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
    mode: "production",
    // debug: true,
    devtool: "source-map",
    // noInfo: false,
    entry: {
        vendor: path.resolve(__dirname, 'src/vendor'),
        main: path.resolve(__dirname, 'src/index')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        filename: "[name].[chunkhash].js"
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    plugins: [
      //Generate a external css file with a hash in the filename
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css'
      }),

      // Hash the file using MD5 so that their names change when the content changes
      new WebpackMd5Hash(),

      //Create Html file that includes reference to bundled js
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        inject: true
      }),

      //Eliminate duplicate packages when generating bundle
      // webpack.optimize.DedupePlugin,

      new webpack.LoaderOptionsPlugin({
       debug: true
      })
    ],
    module: {
        rules: [
          {test: /\.js$/, exclude: /node_module/, loaders: ['babel-loader']},
            {test: /\.css$/, loaders: [MiniCssExtractPlugin.loader, 'css-loader']}
          ]
    },
    optimization: {
      //Use SplitChunks to create a separate bundle files of vendor libraries
      //so that they are catched separately
      splitChunks: {
        // chunks: 'all',
        // minSize: 2000
      },

      //Minify
      minimizer: [new UglifyJSPlugin()]
    }
  }