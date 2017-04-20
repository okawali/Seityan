const path = require('path');
const webpack = require('webpack');

module.exports = [{
    target: "electron-renderer",
    entry: {
        index: ["./app/index.ts"],
        dialog: ["./app/dialog.tsx"]
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
}, {
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
        extensions: ['.ts', '.tsx', '.js']
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
}];