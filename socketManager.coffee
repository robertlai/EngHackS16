MessageRepo = require('./data/MessageRepo')

module.exports = (io) ->

    io.on 'connection', (socket) ->

        socket.on 'conversationConnect', (user) ->
            socket.emit('setGroupId')
            # if not err and _members? and _members.indexOf(user._id) isnt -1
            #     socket.join(_group)
            #     socket.emit('setGroupId', _group)
            # else
            #     socket.emit('notAllowed')

            socket.on 'getChildren', (_parent) ->
                MessageRepo.getChildrenOfNode _parent, (err, nodeWithChildren) ->
                    socket.emit 'receivedChildren', nodeWithChildren

            socket.on 'newMessage', (_newMessageParent, newMessageContent) ->

                MessageRepo.createNewMessage {
                    # _owner: req.user._id
                    content: newMessageContent
                    _children: []
                }, (err, newMessage) ->
                    return next(err) if err
                    socket.emit 'receivedChildren', {
                        _id: _newMessageParent
                        _children: [newMessage]
                    }
                    socket.emit 'newFocus', newMessage._id
                    MessageRepo.addMessageAsChild _newMessageParent, newMessage._id, (err) ->
                        return next(err) if err
