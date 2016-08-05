'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var jade = require('gulp-jade');

gulp.task('default', ['views', 'server', 'watch']);

gulp.task('server', function () {
  return browserSync.init({
    server: {
      injectChanges: true,
      baseDir: '.'
    }
  });
});

gulp.task('watch', function(){
  gulp.watch('./**/*.jade', ['views']);
  gulp.watch('./**/*.html').on('change', debounce(browserSync.reload, 500));
  gulp.watch('./**/*.js').on('change', debounce(browserSync.reload, 500));
});

gulp.task('views', function () {
  var dir = '.';
  gulp.src(['./**/*.jade'])
    .pipe(jade({
      basedir: '.',
      pretty: true,
    }))
    .pipe(gulp.dest('.'))
  ;
});

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
