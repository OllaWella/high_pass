"use strict"

const {src, dest} = require("gulp")
const gulp = require("gulp")
const autoprefixer = require("gulp-autoprefixer")
const cssbeautify = require("gulp-cssbeautify")
const rename = require("gulp-rename")
const sass = require("gulp-sass")(require('sass'))
const cssnano = require("gulp-cssnano")
const uglify = require("gulp-uglify")
const rigger = require("gulp-rigger")
const imagemin = require("gulp-imagemin")
const del = require("del")
const browserSync = require("browser-sync").create()

// Paths
const srcPath = "src/"
const distPath = "dist/"

const path = {
    build: {
        html: distPath,
        css: distPath + "assets/css/",
        js: distPath + "assets/js/",
        images: distPath + "assets/images/",
        fonts: distPath + "assets/fonts/"
    },
    src: {
        html: srcPath + "*.html",
        css: srcPath + "assets/scss/*.*",
        js: srcPath + "assets/js/*.js",
        images: srcPath + "assets/images/**/*.*",
        fonts: srcPath + "assets/fonts/**/*.*"
     },
     watch: {
        html: srcPath + "**/*.html",
        css: srcPath + "assets/scss/**/*.*",
        js: srcPath + "assets/js/**/*.js",
        images: srcPath + "assets/images/**/*.*",
        fonts: srcPath + "assets/fonts/**/*.*"
     },
     clean: "./" + distPath
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        }
    });
}

function html() {
    return src(path.src.html, { base: srcPath })
        .pipe(dest(path.build.html)) 
        .pipe(browserSync.reload({stream: true}))
}

function css() {
    return src(path.src.css, { base: srcPath + "assets/scss/"})
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}))
}

function js() {
    return src(path.src.js, { base: srcPath + "assets/js/"})
        .pipe(rigger())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}))
}

function images() {
    return src(path.src.images, { base: srcPath + "assets/images/"})
        .pipe(imagemin())
        .pipe(dest(path.build.images))
        .pipe(browserSync.reload({stream: true}))
}

function fonts() {
    return src(path.src.fonts, { base: srcPath + "assets/fonts/"})
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({stream: true}))
}

function clean() {
    return del(path.clean)
}

function watchFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.images], images)
    gulp.watch([path.watch.fonts], fonts)
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts))
const watch = gulp.parallel(build, watchFiles, serve)

exports.html = html
exports.css = css
exports.js = js
exports.images = images
exports.fonts = fonts
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch