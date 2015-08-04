var HtmlPlugin = require("./html-plugin");
var path = require("path");
var fs = require("fs");

var LOCAL_MODULES = path.join(__dirname, "..", "node_modules");

function findWorkingDirNodeModules() {
    var parts = process.cwd().split(path.sep);
    while (parts.length > 0) {
        var target = path.join(parts.join(path.sep), "node_modules");
        if (fs.existsSync(target)) {
            return target;
        }
        parts.pop();
    }
}

module.exports = function getBaseConfig (spec) {
    var baseConfig = {
        entry: [].concat(spec.entry),
        output: spec.output,
        resolve: {
            extensions: [
                "",
                ".js",
                ".jsx"
            ],
            alias: spec.alias,
            root: findWorkingDirNodeModules(),
            fallback: spec.fallback || LOCAL_MODULES
        },
        resolveLoader: {
            fallback: spec.fallback || LOCAL_MODULES
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
                        "babel-loader?stage=0&optional[]=runtime"
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
