express = require('express')


module.exports = (io) ->

    conversationsApiHandler = require('../handlers/conversationsApiHandler')(io)

    express.Router()
        .post '/new', conversationsApiHandler.createNewConversation
        .get '/all', conversationsApiHandler.getAllConversations
