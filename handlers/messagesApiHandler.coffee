mongoose = require ('mongoose')

MessageRepo = require('../data/MessageRepo')


module.exports = (io) ->

    addNewMessage = (req, res, next) ->

        console.log req.body

        _newMessageParent = mongoose.Types.ObjectId(req.body._parent)
        newMessageContent = req.body.messageContent
        newMessageChildren = []

        MessageRepo.createNewMessage {
            # _user: req.user._id
            content: newMessageContent
            _children: newMessageChildren
        }, (err, newMessage) ->
            return next(err) if err
            MessageRepo.addMessageAsChild _newMessageParent, newMessage._id, (err) ->
                return next(err) if err
                # io.sockets.in(_group).emit('newMessage', newMessage)
                res.sendStatus(201)

    {
        addNewMessage: addNewMessage
    }
