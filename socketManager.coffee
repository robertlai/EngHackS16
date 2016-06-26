MessageRepo = require('./data/MessageRepo')

module.exports = (io) ->

    io.on 'connection', (socket) ->

        socket.on 'conversationConnect', (user, _group) ->
            socket.emit('setGroupId', _group)
            # if not err and _members? and _members.indexOf(user._id) isnt -1
            #     socket.join(_group)
            #     socket.emit('setGroupId', _group)
            # else
            #     socket.emit('notAllowed')

            socket.on 'getChildren', (_parent) ->
                MessageRepo.getChildrenOfNode _parent, (err, children) ->
                    console.log children
                    socket.emit 'receivedChildren', children
