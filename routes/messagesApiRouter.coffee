express = require('express')

# MessageRepo = require('../data/MessageRepo')

# numberOfMessagesToLoad = 30


module.exports = (io) ->

    messagesApiHandler = require('../handlers/messagesApiHandler')(io)

    express.Router()
        .post '/new', messagesApiHandler.addNewMessage
        .get '/all', messagesApiHandler.getChildren
