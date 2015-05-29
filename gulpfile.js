var ip         = require('ip');
var gulp       = require('gulp');
var riot       = require('gulp-riot');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var eslint     = require('gulp-eslint');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var server     = require('gulp-server-livereload');

gulp.task('riot', function() {
	 gulp.src('scripts/**/*.html')
    .pipe(riot({type: 'none'}))
    .pipe(gulp.dest('scripts'));
})

gulp.task('browserify', ['riot'], function() {
    gulp.src('scripts/main.js')
    .pipe(browserify())
    .pipe(rename('app.js'))
    // .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'));
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

gulp.task('watch', ['browserify', 'serve'], function() {
	gulp.watch(['scripts/**'], ['browserify']);
});

gulp.task('lint', function() {
    gulp.src('scripts/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('default', ['watch']);
