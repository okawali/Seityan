const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: "electron-main",
    node: {
        __dirname: false,
        __filename: false,
    },
    entry: { main: "./main.ts" },
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
                exclude: [
                    /node_modules/,
                    /app\//,
                    /models\//
                ],
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFileName: "tsconfig.main.json"
                        }
                    }
                ]
            }
        ]
    }
}