const mix = require('laravel-mix');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

require('laravel-mix-merge-manifest');
mix.setPublicPath('../../public').mergeManifest();


// ---------------------------------------- //
//      COPIE LIBS
// ---------------------------------------- //
mix.webpackConfig({
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'Resources/assets/js/admin/',
                to: '../public/modules/extranet/js/admin/',
                toType: 'dir'
            },
            {
                from: 'Resources/assets/js/libs/',
                to: '../public/modules/extranet/js/libs/',
                toType: 'dir'
            },
            {
                from: 'Resources/assets/plugins/',
                to: '../public/modules/extranet/plugins/',
                toType: 'dir'
            },
            {
                from: 'Resources/assets/img/',
                to: '../public/modules/extranet/img/',
                toType: 'dir'
            }
        ])
    ]
});
// ---------------------------------------- //


// ---------------------------------------- //
//      LANGUAGES
// ---------------------------------------- //
mix.webpackConfig({
    plugins: [
        new WebpackShellPlugin({
            onBuildStart: [
                'php ../../artisan lang:js ../../public/modules/extranet/js/lang.dist.js -s Resources/lang',
            ],
            onBuildEnd: []
        })
    ]
});

// ---------------------------------------- //
//      COMPILE ASSETS
// ---------------------------------------- //
mix
    .react('Resources/assets/js/back/back-app.js', 'modules/extranet/js')
    .sass('Resources/assets/sass/backend/back-style.scss', 'modules/extranet/css');

mix
    .react('Resources/assets/js/front/front-app.js', 'modules/extranet/js')
    .sass('Resources/assets/sass/front/front-style.scss', 'modules/extranet/css');
// ---------------------------------------- //


if (mix.inProduction()) {
    mix.version();
}
