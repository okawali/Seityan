const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = [{
    mode,
    target: "electron-renderer",
    entry: {
        index: ["./src/app/index.ts"],
        dialog: ["./src/app/dialog.tsx"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [
                    path.resolve(__dirname, "src", "app")
                ],
                exclude: [
                    /node_modules/,
                ],
                use: [
                    {
                        loader: "ts-loader",
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ VERSION: JSON.stringify(require('./package.json').version) })
    ]
}, {
    mode,
    target: "electron-main",
    node: {
        __dirname: false,
        __filename: false,
    },
    entry: { main: "./src/main.ts" },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [
                    /node_modules/,
                    /models\//,
                    /test\//
                ],
                use: [
                    {
                        loader: "ts-loader",
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ VERSION: JSON.stringify(require('./package.json').version) })
    ]
}];