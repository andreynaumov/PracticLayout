const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const shorthand = require('gulp-shorthand')
const autoprefixer = require('gulp-autoprefixer')
const rename = require("gulp-rename")
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()
const del = require('del')


function styles() {
    return gulp.src('src/styles/style.sass')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded', includePaths: require('node-normalize-scss').includePaths}))
        .pipe(autoprefixer({
            cascade: false,
            overrideBrowserslist: 'last 2 version'
        }))
        .pipe(shorthand())
        .pipe(cleanCSS({
            debug: true,
            compatibility: '*'
        }, details => {
            console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
}


function scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}


function fonts() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
}


function imageMinify() {
    return gulp.src('src/image/**/*.{gif,png,jpg,svg,webp,jpeg}')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/image'))
        .pipe(browserSync.stream());
}


function watch() {
    browserSync.init({
        server: {
            baseDir: "./",
            tunnel: true
        }
    });
    gulp.watch('src/styles/**/*.sass', styles);
    gulp.watch('src/js/**/*.js', scripts);
    gulp.watch('src/image/**/*.{gif,png,jpg,svg,webp,jpeg}', imageMinify);
    gulp.watch('src/fonts/**/*', fonts);
    gulp.watch('./*.html').on('change', browserSync.reload);
}


function clean() {
    return  del(['dist/*'])
}



const dev = gulp.parallel(styles, scripts, fonts, imageMinify)
const build = gulp.series(clean, dev)


module.exports.style = styles
module.exports.script = scripts
module.exports.font = fonts
module.exports.img = imageMinify
module.exports.watc = gulp.series(styles, watch)
module.exports.clean = clean


module.exports.dev = gulp.series(build, watch)
module.exports.build = gulp.series(build)




