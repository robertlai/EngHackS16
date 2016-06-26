Message = require('./models/Message')


createNewMessage = (options, next) ->
    new Message(options)
        .save next

addMessageAsChild = (_parent, _messageToAdd, next) ->
    Message.findByIdAndUpdate _parent,
        { $addToSet: { _children: _messageToAdd } },
        next

getChildrenOfNode = (_parent, next) ->
    Message.findOne({ _id: _parent })
        .populate('_children')
        .exec next


module.exports = {
    createNewMessage: createNewMessage
    addMessageAsChild: addMessageAsChild
    getChildrenOfNode: getChildrenOfNode
}
