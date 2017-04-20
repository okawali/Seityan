const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: "electron-renderer",
    entry: {
        index: ["./app/index.ts"],
        dialog: ["./app/index.tsx"]
    },
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
                test: /\.tsx?$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    /node_modules/,
                ],
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFileName: "tsconfig.json"
                        }
                    }
                ]
            }
        ]
    }
}