var HtmlPlugin = require("./html-plugin");
var path = require("path");

module.exports = function getBaseConfig (spec) {
    return {
        entry: [].concat(spec.entry),
        output: spec.output,
        resolve: {
            extensions: [
                "",
                ".js",
                ".jsx"
            ]
        },
        plugins: [
            new HtmlPlugin({
                html: spec.html
            })
        ],
        module: {
            loaders: [
                {
                    test: /(\.js$)|(\.jsx$)/,
                    exclude: /node_modules/,
                    loaders: [
                        "babel-loader",
                        "jsx?harmony&stripTypes"
                    ]
                }
            ]
        }
    }
}
