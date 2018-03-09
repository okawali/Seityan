const webpack = require('webpack');
const fse = require('fs-extra');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const pug = require('pug');
const path = require('path');
const webpackConfig = require('./webpack.config');
const PluginError = require('plugin-error');
const log = require('fancy-log');

gulp.task('clean', () => {
    return fse.remove(path.resolve(__dirname, 'dist'))
        .then(_ => {
            return fse.mkdir(path.resolve(__dirname, 'dist'));
        });
});

gulp.task('create-package', () => {
    return fse.writeFile(
        path.resolve(__dirname, 'dist', 'package.json'),
        JSON.stringify({ main: 'main.js' }),
        { encoding: 'utf8', flag: 'w' }
    )
})

gulp.task('build-html', () => {
    const dialog = fse.readFile(path.resolve(__dirname, 'src', 'templates', 'dialog.pug'), 'utf8')
        .then(data => {
            return pug.render(data);
        })
        .then(html => {
            return fse.writeFile(
                path.resolve(__dirname, 'dist', 'dialog.html'),
                html,
                { encoding: 'utf8', flag: 'w' }
            )
        });
    const index = fse.readFile(path.resolve(__dirname, 'src', 'templates', 'index.pug'), 'utf8')
        .then(data => {
            return pug.render(data);
        })
        .then(html => {
            return fse.writeFile(
                path.resolve(__dirname, 'dist', 'index.html'),
                html,
                { encoding: 'utf8', flag: 'w' }
            )
        });
    return Promise.all([dialog, index]);
});

gulp.task('copy', () => {
    return gulp.src(['./src/lib/**/*', './src/assets/**/*'], { base: path.resolve(__dirname, 'src') })
        .pipe(gulp.dest(path.resolve(__dirname, 'dist')));
});

gulp.task('build-source', () => {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig, (err, stats) => {
            const jsonStats = stats && stats.toJson();
            const buildError = err || jsonStats.errors[0] || jsonStats.warnings[0];
            if (buildError) {
                reject(new PluginError('webpack', buildError));
            } else {
                log('[webpack]', stats.toString({
                    colors: true,
                    version: false,
                    hash: false,
                    timings: false,
                    chunks: false,
                    chunkModules: false,
                }));
                resolve();
            }
        });
    });
});

gulp.task('build', ['clean'], (done) => {
    return runSequence([
        'copy',
        'build-html',
        'create-package',
        'build-source'
    ], done);
})
