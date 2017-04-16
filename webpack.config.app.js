const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: "electron-renderer",
    entry: { index: ["./app/index.ts"] },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    /node_modules/,
                    /models\//
                ],
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFileName: "tsconfig.app.json"
                        }
                    }
                ]
            }
        ]
    }
}