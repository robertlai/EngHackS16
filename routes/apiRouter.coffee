express = require('express')

module.exports = (io) ->

    conversationsApiRouter = require('./conversationsApiRouter')(io)

    return express.Router()
        .use('/conversations', conversationsApiRouter)
