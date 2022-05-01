const mix = require('laravel-mix');

require('laravel-mix-merge-manifest');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/Admin/app.js', 'public/js/admin')
    .vue()
    .extract()
    .postCss('resources/css/admin.css', 'public/css/admin', [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
    ])
    .alias({
        '@': 'resources/js',
    })
    .mergeManifest();

if (mix.inProduction()) {
    mix.version();
}
