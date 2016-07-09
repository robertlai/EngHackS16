MessageRepo = require('./data/MessageRepo')

module.exports = (io) ->

    io.on 'connection', (socket) ->

        socket.on 'conversationConnect', (user, _conversation) ->

            socket.join(_conversation)

            MessageRepo.getNode _conversation, (err, rootNode) ->
                return console.log err if err
                socket.emit('setRootNode', rootNode)

            socket.on 'getChildren', (_parent) ->
                MessageRepo.getChildrenOfNode _parent, (err, nodeWithChildren) ->
                    socket.emit 'receivedChildren', nodeWithChildren

            socket.on 'newMessage', (_user, _newMessageParent, newMessageContent) ->

                MessageRepo.createNewMessage {
                    _owner: _user
                    content: newMessageContent
                    _children: []
                }, (err, newMessage) ->
                    return console.log err if err

                    io.sockets.in(_conversation).emit 'receivedChildren', {
                        _id: _newMessageParent
                        _owner: _user
                        _children: [newMessage]
                        isLiveMessage: true
                    }
                    MessageRepo.addMessageAsChild _newMessageParent, newMessage._id, (err) ->
                        return console.log err if err
