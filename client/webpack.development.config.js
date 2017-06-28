var path = require('path');
// var webpack = require('webpack');
// var HtmlwebpackPlugin = require('html-webpack-plugin');
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');
console.log("development!!!!!")

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        publicPath: '/',
        path: path.resolve(__dirname, '/built'),
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader"
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.(s){0,1}css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourcemaps: true,
                        }
                    },
                    "sass-loader"
                ]
            },
        ]
    },
    devServer: {
        proxy: {
        '/api/*': {
            target: 'http://127.0.0.1:5000'
        },
        },
        historyApiFallback: true,
        inline: true
    },
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin(),
    //     new HtmlwebpackPlugin({
    //     template: './index.html'
    //     }),
    //     new OpenBrowserPlugin({
    //     url: 'http://localhost:8080'
    //     })
    // ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};