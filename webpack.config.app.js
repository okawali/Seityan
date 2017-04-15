const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: "electron-renderer",
    entry: { index: ['babel-polyfill', "./app/index.ts"] },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            "ajv": path.resolve(__dirname, "node_modules/ajv/dist/ajv.bundle.js") //fix ajv require error
        }
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
                        loader: "babel-loader"
                    },
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