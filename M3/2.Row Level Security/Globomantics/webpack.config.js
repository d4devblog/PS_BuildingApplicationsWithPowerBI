﻿/// <binding AfterBuild='Run - Development' />
var path = require('path');

module.exports = {
    entry: "./app/index.tsx",
    output: {
        filename: "bundle.js",
        pathinfo: false,
        path: path.resolve(__dirname, "./wwwroot/js/")
    },

    devtool: "eval",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'app'),
                loader: "awesome-typescript-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};