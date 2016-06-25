mongoose = require ('mongoose')

MessageRepo = require('../data/MessageRepo')


module.exports = (io) ->

    addNewMessage = (req, res, next) ->

        _newMessageParent = mongoose.Types.ObjectId('576f09ee9ad4abc82ce85beb')
        newMessageContent = 'wef'
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
