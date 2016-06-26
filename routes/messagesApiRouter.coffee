express = require('express')

# MessageRepo = require('../data/MessageRepo')

# numberOfMessagesToLoad = 30


module.exports = (io) ->

    messagesApiHandler = require('../handlers/messagesApiHandler')(io)

    express.Router()
        .get '/all', messagesApiHandler.getChildren
