const mix = require('laravel-mix');
const CopyWebpackPlugin = require('copy-webpack-plugin');


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
            }
        ])
    ]
});
// ---------------------------------------- //


// ---------------------------------------- //
//      COMPILE ASSETS
// ---------------------------------------- //
mix
    .react('Resources/assets/js/app.js', 'modules/extranet/js')
    .sass('Resources/assets/sass/app.scss', 'modules/extranet/css');
// ---------------------------------------- //


if (mix.inProduction()) {
    mix.version();
}

