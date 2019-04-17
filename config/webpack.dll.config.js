const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react']
    },
    output: {
        path: path.resolve(__dirname, '../dll'),
        filename: '[name].dll.js',
        library: '[name]_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.resolve(__dirname, '../dll', '[name]-manifest.json')
        })
    ]
};