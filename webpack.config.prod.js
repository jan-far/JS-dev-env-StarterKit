import path from "path";
import webpack from "webpack";
// import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export default {
    mode: "development",
    // debug: true,
    devtool: "source-map",
    // noInfo: false,
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    plugins: [
      //Eliminate duplicate packages when generating bundle
      // webpack.optimize.DedupePlugin,
      //Minify jsnpm install uglifyjs-webpack-plugin --save-dev
      new webpack.LoaderOptionsPlugin({
       debug: true
      })
    ],
    module: {
        rules: [
          {test: /\.js$/, exclude: /node_module/, loaders: ['babel-loader']},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']}
          ]
    }
  }