mongoose = require ('mongoose')

MessageRepo = require('../data/MessageRepo')


module.exports = (io) ->

    addNewMessage = (req, res, next) ->

        _newMessageParent = mongoose.Types.ObjectId(req.body._parent)
        newMessageContent = req.body.messageContent
        newMessageChildren = []

        MessageRepo.createNewMessage {
            # _owner: req.user._id
            content: newMessageContent
            _children: newMessageChildren
        }, (err, newMessage) ->
            return next(err) if err
            MessageRepo.addMessageAsChild _newMessageParent, newMessage._id, (err) ->
                return next(err) if err
                # io.sockets.in(_group).emit('newMessage', newMessage)
                res.sendStatus(201)


    getChildren = (req, res, next) ->

        _parent = mongoose.Types.ObjectId(req.body._parent)

        MessageRepo.getChildrenOfNode _parent, (err, allNodes) ->
            return next(err) if err
            res.json(allNodes)

    {
        addNewMessage: addNewMessage
        getChildren: getChildren
    }
