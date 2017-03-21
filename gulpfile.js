var gulp = require('gulp'), //本地安装gulp所用到的地方
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    uglify = require('gulp-uglify'), //使用gulp-uglify压缩javascript文件，减小文件大小
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'), //使用gulp-concat合并javascript文件，减少网络请求
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'), //gulp-livereload拯救F5！当监听文件发生变化时，浏览器自动刷新页面。【事实上也不全是完全刷新，例如修改css的时候，不是整个页面刷新，而是将修改的样式植入浏览器，非常方便。】特别是引用外部资源时，刷新整个页面真是费时费力（需要配合浏览器插件使用）
    htmlmin = require('gulp-htmlmin'), //使用gulp-htmlmin压缩html，可以压缩页面javascript、css，去除页面空格、注释，删除多余属性等操作
    del = require('del'),
    rev = require('gulp-rev-append'); //版本控制器
//定义一个testLess任务（自定义任务名称）
gulp.task('styles', function() {
    gulp.src('src/**/*.scss') //该任务针对的文件
        .pipe(sass({
            style: 'expanded'
        })) //该任务调用的模块
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6',  'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/')) //将会在src/css下生成index.css
        .pipe(rename({
            suffix: '.min'
        })) //重命名为min
        .pipe(cssmin()) //压缩css文件
        .pipe(gulp.dest('dist/'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});
gulp.task('default', ['style', 'elseTask']); //定义默认任务
// Scripts
gulp.task('js', function() {
    return gulp.src('src/**/*.js')
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js')) //合并后的文件名
    .pipe(gulp.dest('dist/js'))
        .pipe(uglify({ //使用gulp-uglify压缩javascript文件，减小文件大小
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            mangle: {
                except: ['require', 'exports', 'module', '$']
            } //排除混淆关键字
        }))
        .pipe(concat('main.js')) //合并后的文件名
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});
//html
gulp.task('html', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(rev()) //版本控制
        .pipe(gulp.dest('dist/html'));
    .pipe(htmlmin(options)) //压缩html文件
        .pipe(gulp.dest('dist/html'));
});
//images
gulp.task('img', function() {
    gulp.src('src/img/*.{png,jpg,gif,ico,jpeg}')
        .pipe(imagemin({
            optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }], //不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/min'));
});
// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('src/**/*.scss', ['styles']);
    // Watch .js files
    gulp.watch('src/**/*.js', ['scripts']);
    // Watch image files
    gulp.watch('src/**/*', ['images']);
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});