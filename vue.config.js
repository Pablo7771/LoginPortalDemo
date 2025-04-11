
const webpack = require('webpack');

module.exports = {
    devServer: {
        proxy: {
            '/api': {
            target: 'https://next.mydeister.com',
            changeOrigin: true,
            secure: false, // Solo si el servidor usa HTTPS con certificado no válido
            pathRewrite: { '^/api': '' }, // Esto elimina "/api" del path
            },
        },
    },
    css: {
        extract: false
    },
    /**
     * By default babel-loader ignores all files inside node_modules.
     * If you want to explicitly transpile a dependency with Babel, you can list it in this option.
     */
    transpileDependencies: [
        'vuetify'
    ],
    /**
     * Setting this to false can speed up production builds if you don't need source maps for production.
     */
    productionSourceMap : process.env.NODE_ENV !== "production",

    /**
     *
     */
    indexPath: "index.handlebars",

    /**
     *
     */
    configureWebpack: {
        /**
         *
         */
        output: {
            filename: 'js/login.js',
            chunkFilename: 'js/login.chunk-vendors.js',
        },
        /**
         * Tell webpack to minimize the bundle using the TerserPlugin.
         */
        optimization: {
            minimize: process.env.NODE_ENV === "production"
        },
        /**
         *
         */
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ]
    }
};