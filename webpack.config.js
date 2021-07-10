const path = require("path");
const MyPlugin = require("./myplugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.png$/,
        loader: "url-loader",
        options: {
          publicPath: "../dist/",
          name: "[name].[ext]?[hash]",
          limit: 5000,
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "이것은 배너입니다. 조상호",
    }),
    new webpack.DefinePlugin({
      TWO: JSON.stringify("1+1"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
        ]
      : []),
  ],
};
