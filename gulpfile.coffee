require('coffee-script').register()
gulp = require('gulp')
path = require('path')
del = require('del')
coffeelint = require('gulp-coffeelint')
nodemon = require('gulp-nodemon')

allClientCoffeeSrc = path.join('src', 'scripts', '*.coffee')
passportSrcPath = './passport.coffee'
appSrcPath = './app.coffee'
socketManagerSrcPath = './socketManager.coffee'
dataSrcPath = './data/**/*.coffee'
routesSrcPath = './routes/**/*.coffee'
allServerCoffeeFiles = [passportSrcPath, appSrcPath, socketManagerSrcPath, dataSrcPath, routesSrcPath]


allCoffeeFiles = allServerCoffeeFiles.concat([allClientCoffeeSrc])

gulp.task 'coffeelint', ->
    gulp.src(allCoffeeFiles)
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())

gulp.task 'dev', ->
    process.env.NODE_ENV = 'dev2'
    nodemon({
        script: 'server.coffee'
    })
