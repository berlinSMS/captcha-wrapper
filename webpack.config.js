const path = require('path');

module.exports = {
    entry: {
        js: './src/bsms-captcha-wrapper.js',  
    },
    output: {
        filename: 'bsms-captcha-wrapper.min.[name]',
        path: path.resolve(__dirname, 'dist')
    },
};
