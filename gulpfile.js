var ip         = require('ip');
var gulp       = require('gulp');
var riotify    = require('riotify');
var watchify   = require('watchify');
var browserify = require('browserify');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var concat     = require('gulp-concat');
var eslint     = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var cssmin     = require('gulp-minify-css');
var buffer     = require('vinyl-buffer');
var source     = require('vinyl-source-stream');
var server     = require('gulp-server-livereload');
var imageop    = require('gulp-image-optimization');
var jsonserver = require('json-server');

var options = {
    entries: ['./main.js'],
    extensions: ['.html'],
    basedir: './scripts'
};

gulp.task('watch', function() {
    var b = watchify(browserify(options)
        .transform(riotify, { type: 'none', ext: 'html'}));

    b.on('update', rebundle);

    function rebundle() {
        return b.bundle()
            .pipe(source('app.js'))
            // .pipe(buffer())
            // .pipe(sourcemaps.init({loadMaps: true}))
            // .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/assets/js'));
    }
    return rebundle();
});

gulp.task('browserify', function() {
    var b = browserify(options).transform(riotify, { type: 'none', ext: 'html'});
    b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('serve', function() {
    var ser = server({
        host: ip.address(),
        livereload: true,
        open: true,
        directoryListing: {path: 'dist'},
        defaultFile: 'index.html'
    });
    gulp.src('./').pipe(ser);
});

gulp.task('db', function() {
    var cors   = require('cors')
    var server = jsonserver.create();
    var router = jsonserver.router('data/db.json');
    server.use(jsonserver.defaults);
    server.use(cors({origin: true, credentials: true}));
    server.use(router);
    server.listen(3000);
});

gulp.task('setip', function() {
    var fs = require('fs');
    fs.writeFile('dist/config.json', '{"urlRoot": "http://' + ip.address() + ':3000/"}');
})

gulp.task('lint', function() {
    gulp.src('scripts/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('common', function() {
    gulp.src(['assets/js/zepto.js', 'assets/js/frozen.js'])
        .pipe(concat('common.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('img', function() {
    gulp.src('assets/img/**')
        .pipe(imageop({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })).pipe(gulp.dest('dist/assets/img'));
});

gulp.task('copy', function() {
    gulp.src('assets/font/**')
        .pipe(gulp.dest('dist/assets/font'));

    gulp.src('index_dist.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
    gulp.src('assets/css/app.css')
        .pipe(cssmin({rebase: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/assets/css'));
});


gulp.task('default', ['watch', 'serve', 'db', 'setip']);

gulp.task('build', ['browserify', 'common', 'copy', 'img', 'css']);

