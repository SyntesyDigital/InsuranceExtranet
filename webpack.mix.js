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
        ]),
    ],
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
//      CREATIC LIBRARY
// ---------------------------------------- //
mix.webpackConfig({
    // plugins: [

    //     new SVGSpritemapPlugin('Resources/assets/img/creatic-lib/**/*.svg', {
    //         output: {
    //             svg: {
    //                 // Disable `width` and `height` attributes on the root SVG element
    //                 // as these will skew the sprites when using the <view> via fragment identifiers
    //                 sizes: false
    //             }
    //         },
    //         sprite: {
    //             generate: {
    //                 // Generate <use> tags within the spritemap as the <view> tag will use this
    //                 use: true,
    //                 // Generate <symbol> tags within the SVG to use in HTML via <use> tag
    //                 symbol: true
    //             },
    //         },
    //     }),

    //     new HtmlWebpackPlugin({
    //         title: 'Example: inline-html',
    //         template: path.resolve(__dirname, 'Resources/views/front/layouts/app')
    //     })
    // ]
    loaders: [{
        test: /path-to-icons\/.*\.svg$/, // your icons directory
        loader: 'svg-sprite-loader',
        options: {
            extract: true,
            spriteFilename: './path-to-dist/icons.svg', // this is the destination of your sprite sheet,
            runtimeCompat: true
        }
    }],

    plugins: [
        new SpriteLoaderPlugin({
            plainSprite: true
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
