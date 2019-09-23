const mix = require('laravel-mix');

require('laravel-mix-merge-manifest');

mix.setPublicPath('../../public').mergeManifest();

mix.react('Resources/assets/js/app.js', 'modules/extranet/js')
    .sass('Resources/assets/sass/app.scss', 'modules/extranet/css');

if (mix.inProduction()) {
    mix.version();
}

