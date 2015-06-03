var fs         = require('fs');
var path       = require('path');
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
    rebundle();

    function rebundle() {
        var b = watchify(browserify(options)
        .transform(riotify, { type: 'none', ext: 'html', parser: mixin}));
        recurse('./scripts/app', './scripts', b);
        b.on('update', rebundle);
        b.bundle()
            .pipe(source('app.js'))
            // .pipe(buffer())
            // .pipe(sourcemaps.init({loadMaps: true}))
            // .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/assets/js'));
    }
});

var mixin = function(js, options) {
    if(!js) {
        return "app.mixin(this, require('./'));";
    }
    return js;
}

var recurse = function(dir, root, b) {
    fs.readdirSync(dir).forEach(function(file) {
        var filename = path.join(dir, file), ext;
        if (fs.statSync(filename).isDirectory()) {
            recurse(filename, root, b);
        } else {
            ext = path.extname(filename);
            if (ext === '.html') {
                filename = path.relative(root, filename)
                filename = path.join(path.dirname(filename), path.basename(filename, ext));
                b.require('./' + filename.replace(/\\/g, '/'), {entry: true, expose: false });
            }
        }
    })
}

gulp.task('browserify', function() {
    var b = browserify(options).transform(riotify, { type: 'none', ext: 'html', compact: true, parser: mixin});
    recurse('./scripts/app', './scripts', b);
    b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('serve', function() {
    var ser = server({
        host: ip.address(),
        open: true,
        defaultFile: 'index.html',
        // directoryListing: {path: 'dist'},
        livereload: {
            enable: true,
            filter: function(filePath, cb) {
                cb(/assets/.test(filePath));
            }
        }
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

