/**
 * Created by JAAR on 28-03-2016.
 */
var gulp=require('gulp');
var concat = require('gulp-concat');
var annotate=require('gulp-ng-annotate');
var uglify=require('gulp-uglify');

gulp.task('build_app', function() {
    return gulp.src(['public/js/app.js','public/js/services/*.js', 'public/js/controllers/*.js', 'public/js/directives/*.js'])
        .pipe(annotate())
        .pipe(concat('app.min.js'))
		.pipe(uglify({mangle:false}))
		.pipe(gulp.dest('public/js'));
})

gulp.task('build_vendor_modules',function(){
    return gulp.src(['public/js/vendors/jquery/dist/jquery.min.js','public/js/vendors/angular/angular.min.js','public/js/vendors/bubbleLib.js','public/js/vendors/angular-ui-router/angular-ui-router.min.js','public/js/vendors/angular-animate/angular-animate.min.js'])
        .pipe(annotate())
        .pipe(uglify({mangle:false}))
        .pipe(concat('ext.min.js'))
        .pipe(gulp.dest('public/js'));
});

