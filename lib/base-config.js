var HtmlPlugin = require("./html-plugin");
var path = require("path");

module.exports = function getBaseConfig (spec) {
    var baseConfig = {
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
                    loaders: [
                        "babel-loader?stage=0&optional[]=runtime&plugins[]=typecheck"
                    ]
                }
            ]
        }
    }
    if (spec.include) {
        baseConfig.module.loaders[0].include = spec.include;
    }
    else {
        baseConfig.module.loaders[0].exclude = /node_modules/;
    }
    return baseConfig;
}
