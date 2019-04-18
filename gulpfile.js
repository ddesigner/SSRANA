var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');
const concat = require('gulp-concat');
const image = require('gulp-image');
const gulpFont = require('gulp-font');
 

function nunjucks() {
  nunjucksRender.nunjucks.configure(['app/templates/']);
  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
   // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest('dist'))
};

function style() {
     return (
      gulp
        .src("app/templates/scss/app.scss")
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(gulp.dest("dist/css"))
    );
  
  }
   

  function images() {
    return(
    gulp.src('app/templates/images/**/*.{jpg,png,gif}')
      .pipe(gulp.dest("dist/images"))
    )}

  function js() {
    return(
    gulp.src('app/templates/js/*.js')
      .pipe(concat('app.js'))
      .pipe(gulp.dest("dist/js"))
    )}

     function font() {
      return src('app/templates/fonts/**/*.{ttf,otf,woff}', { read: false })
          .pipe(gulpFont({
              ext: '.css',
              fontface: 'src/assets/fonts',
              relative: '/assets/fonts',
              dest: 'dist/assets/fonts',
              embed: ['woff'],
              collate: false
          }))
          .pipe(dest('dist/fonts'));
  }
   

exports.nunjucks = nunjucks;
exports.style = style;
exports.js = js;
exports.images = images;
exports.font = font;
function watch(){
  // gulp.watch takes in the location of the files to watch for changes
  // and the name of the function we want to run on change
  gulp.watch('app/templates/scss/**/*.scss', style)
  gulp.watch('app/pages/**/*.+(html|nunjucks)', nunjucks)
 // gulp.watch('app/templates/js/*.js)', js)
  gulp.watch('app/templates/images/*)', images)
  gulp.watch('app/templates/fonts/**/*.{ttf,otf,woff}*)', font)
  
  
}
  
// Don't forget to expose the task!
exports.watch = watch