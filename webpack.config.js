const path = require('path');

module.exports = {
    entry: { index: ['babel-polyfill', "./app/index.ts"] },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "umd"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    "node_modules"
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