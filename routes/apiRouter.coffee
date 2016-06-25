express = require('express')

module.exports = (io) ->

    messagesApiRouter = require('./messagesApiRouter')(io)

    return express.Router()
        .use('/messages', messagesApiRouter)
