var fs = require('fs');
var path = require('path');
var webpack = require("webpack");

// modules to resolve in packgaes/node_modules
// Exp: express/node_modules
var resolveModules = () => {
    var nodeModules = {};
    fs.readdirSync('node_modules')
        .filter(function(x) {
            return ['.bin'].indexOf(x) === -1;
        })
        .forEach(function(mod) {
            nodeModules[mod] = 'commonjs ' + mod;
        });
    return nodeModules;
}

module.exports = (env) => {
    const serverTarget = env.SRV_TARGET || 'enviroments/enviroment';
    console.log('SERVER:', serverTarget)
    return {
        target: 'node',
        devtool: 'source-map',
        entry: {
            'buildDialer' : './src/io/index.ts'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.join(__dirname, 'dist'),
            libraryTarget: 'commonjs'
        },
        resolve: {
            extensions: [ '.ts', '.js' ],
            modules: [ 
                'node_modules',
                path.resolve(__dirname, 'node_modules')
            ]
        },
        externals: resolveModules(),
        module: {
            rules: [{
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                }]
            }]
        },
        node: {
            __dirname: false,
            __filename: true,
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/(.*)enviroments\/enviroment(\.*)/, function(resource) {
                resource.request = resource.request.replace(/enviroments\/enviroment/, serverTarget);
            })
        ]
    };
}