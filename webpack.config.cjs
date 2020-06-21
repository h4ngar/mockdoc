const path = require('path');
const CLIENT_DIR = path.resolve(__dirname, 'examples/client');
const SRC_DIR = path.resolve(__dirname, 'node_modules/@scripty/react-store/lib');

module.exports = {
    entry: [
        CLIENT_DIR + '/index.jsx'
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@client': CLIENT_DIR,
            '@src': SRC_DIR
        }
    },
    output: {
        path: path.resolve(__dirname, 'public/dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|sass|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    }
};
