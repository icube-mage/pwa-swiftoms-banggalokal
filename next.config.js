const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const withPWA = require('next-pwa')({
    dest: 'public',
    swSrc: 'src/public/sw.js',
    sw: 'sw.js',
    register: true,
    skipWaiting: true,
    disable: isDev,
    buildExcludes: [/editor\.worker\.js/, /emailtemplates/],
});

const { basePath } = require('./swift.config');

module.exports = withPWA({
    basePath,
    poweredByHeader: false,
    productionBrowserSourceMaps: true,
    publicRuntimeConfig: {
        appEnv: process.env.APP_ENV,
        rootDir: __dirname,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config, { // activate if need to analysis size build
        isServer, webpack,
    }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        // Important: return the modified config
        // config.plugins.push(new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     reportFilename: './analyze/client.html',
        // }));
        config.plugins.push(new webpack.ProvidePlugin({
            React: 'react',
        }));
        if (!isServer) {
            // eslint-disable-next-line no-param-reassign
            config.resolve.alias['@sentry/node'] = '@sentry/browser';
            config.plugins.push(new MonacoWebpackPlugin({
                // available options are documented at https://github.com/microsoft/monaco-editor/blob/main/webpack-plugin/README.md#options
                languages: ['javascript', 'typescript', 'xml'],
            }));
        }
        return config;
    },
    // generateInDevMode: true, // please comment if develop to production
    // enable code below on Prod and increase the version everytime before running build script
    // generateBuildId: async () => 'swift-pwa-v1.0.0',
});
