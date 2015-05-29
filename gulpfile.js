var ip         = require('ip');
var gulp       = require('gulp');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var eslint     = require('gulp-eslint');
var riotify    = require('riotify');
var watchify   = require('watchify');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var buffer     = require('vinyl-buffer');
var source     = require('vinyl-source-stream');
var server     = require('gulp-server-livereload');

var options = {
    entries: ['./main.js'],
    extensions: ['.html'],
    basedir: './scripts'
};

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

gulp.task('watch', function() {
    var b = watchify(browserify(options)
        .transform(riotify, { type: 'none', ext: 'html'}));

    b.on('update', rebundle);

    function rebundle() {
        return b.bundle()
            .pipe(source('app.js'))
            // .pipe(buffer())
            // .pipe(uglify())
            // .pipe(rename('app.min.js'))
            // .pipe(buffer())
            // .pipe(sourcemaps.init({loadMaps: true}))
            // .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/js/'));
    }
    return rebundle();
});

gulp.task('lint', function() {
    gulp.src('scripts/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('default', ['watch', 'serve']);
