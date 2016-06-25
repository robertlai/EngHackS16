# process.on 'uncaughtException', (err) ->
#     console.log '\n NodeJS Exception!'
#     console.log err and err.stack or err
#     return

path = require('path')

require('./bin/parseArgs')

logger = require('morgan')
express = require('express')
app = express()
http = require('http').Server(app)
io = require('socket.io')(http)

mongoose = require('mongoose')
passport = require('passport')
cookieParser = require('cookie-parser')
bodyParser = require('body-parser')
session = require('express-session')

app.use(logger('dev'))

config = require('./bin/config')

mongoose.connect(config.dbAddress)

assetsroot = 'dist'

viewEngine = require('./bin/viewEngine')

app.enable('view cache')
app.engine('html', viewEngine)
app.set('views', path.join(__dirname, assetsroot, 'views'))

if config.mode isnt 'production'
    require('./bin/dev.js')(app)

# app.use(express.urlencoded())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, assetsroot)))


router = require('./routes/router')(io)
app.use(router)

# routes(app)

http.listen(config.port)

module.exports = http # not sure if I need this :)
