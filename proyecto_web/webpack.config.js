const path = require('path');

module.exports = {
    context: path.join(__dirname, 'client'),
    entry: [
        './main.js',
    ],
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
        ],
    },
};