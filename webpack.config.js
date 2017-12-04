const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports =  {
    entry: "./src/index.tsx",
    output: {
        filename: "[name].[hash].js",
        path: path.join(__dirname, "dist"),
        publicPath: "/",
    },
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        historyApiFallback: {
            disableDotRule: true,
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true,
                            useBabel: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ]
}
