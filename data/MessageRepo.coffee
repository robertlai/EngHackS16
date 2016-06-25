Message = require('./models/Message')


createNewMessage = (options, next) ->
    new Message(options)
        .save next

addMessageAsChild = (_parent, _messageToAdd, next) ->
    Message.findByIdAndUpdate _parent,
    { $addToSet: { _children: _messageToAdd } },
    next


module.exports = {
    createNewMessage: createNewMessage
    addMessageAsChild: addMessageAsChild
}
