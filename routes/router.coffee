express = require('express')

config = require('../bin/config')

GetEnvironment = (req, res) ->
    environment =
        langHeader: req.get('accept-language')
        hosts: config.hosts
        mode: config.mode

    javascript = 'window.EH = ' + JSON.stringify(environment) + ';'
    res.set 'Content-Type', 'application/javascript'
    res.send javascript
    return

GetIndex = (req, res) ->
    res.set 'Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0'
    res.set 'Expires', 'Thu, 1 January 1970 00:00:00 GMT'
    res.render 'index.html'
    return

loggedIn = (req, res, next) ->
    if req.isAuthenticated()
        next()
    else
        res.sendStatus(401)

module.exports = (io) ->

    router = express.Router()

    router.get('/environment', GetEnvironment)

    apiRouter = require('./apiRouter')(io)
    authRouter = require('./authRouter')

    router.use('/api', loggedIn, apiRouter)
    router.use('/auth', authRouter)

    router.get('*', GetIndex)

    router.use (err, req, res, next) ->
        res.sendStatus(500).send(err)

    return router
