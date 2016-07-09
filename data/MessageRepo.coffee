Message = require('./models/Message')
User = require('./models/User')


createNewMessage = (options, next) ->
    new Message(options)
        .populate('_owner')
        .save (err, newMessage) ->
            next(err) if err?
            Message.populate(newMessage, { path: '_owner', model: 'user', select: 'username' }, next)

addMessageAsChild = (_parent, _messageToAdd, next) ->
    Message.findByIdAndUpdate _parent,
        { $addToSet: { _children: _messageToAdd } },
        next

getNode = (_nodeId, next) ->
    Message.findOne({ _id: _nodeId })
        .populate('_owner', 'username')
        .exec next

getChildrenOfNode = (_parent, next) ->
    Message.findOne({ _id: _parent })
        .populate('_children')
        .populate('_owner', 'username')
        .exec (err, data) ->
            next(err) if err?
            User.populate data._children, { path: '_owner', model: 'user', select: 'username' }, (err, d) ->
                next(err, data)



module.exports = {
    createNewMessage: createNewMessage
    addMessageAsChild: addMessageAsChild
    getNode: getNode
    getChildrenOfNode: getChildrenOfNode
}
