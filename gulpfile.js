var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var data = require('./mock/data.json');


gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8989,
            middleware: function(req, res, next) {
                if (pathname === '/facicon.ico') {
                    return;
                }
                var pathname = require('url').parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                // console.log(pathname)
                if (pathname === '/api/serverData') {
                    res.end(JSON.stringify(data));
                } else if (pathname === '/style.css') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'css', 'style.css')));
                } else if (pathname === '/flexible.js') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'js', 'flexible.js')));
                } else if (pathname === '/index.html') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')));
                }
            }
        }))
});