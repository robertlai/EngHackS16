mongoose = require ('mongoose')

MessageRepo = require('../data/MessageRepo')
ConversationRepo = require('../data/ConversationRepo')


module.exports = (io) ->


    createNewConversation = (req, res, next) ->

        newConversationOwner = req.user._id
        newConversationTitle = req.body.title
        newConversationContent = req.body.content

        MessageRepo.createNewMessage {
            _owner: newConversationOwner
            content: newConversationContent
            _children: []
        }, (err, newMessage) ->
            return next(err) if err

            ConversationRepo.addNewConversation {
                title: newConversationTitle
                _owner: newConversationOwner
                _rootNode: newMessage._id
            }, (err, newConversation) ->
                return next(err) if err
                res.json(newConversation)

    getAllConversations = (req, res, next) ->
        ConversationRepo.getAllConversations (err, allConversations) ->
            return next(err) if err
            res.json(allConversations)


    {
        createNewConversation: createNewConversation
        getAllConversations: getAllConversations
    }
