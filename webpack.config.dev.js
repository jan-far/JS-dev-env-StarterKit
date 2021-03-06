import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    mode: "development",
    // debug: true,
    devtool: "inline-source-map",
    // noInfo: false,
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'src'),
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: true
      }),

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