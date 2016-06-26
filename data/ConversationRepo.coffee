Conversation = require('./models/Conversation')


addNewConversation = (options, next) ->
    new Conversation(options)
        .save next

getAllConversations = (next) ->
    Conversation.find({})
        .exec next


module.exports = {
    addNewConversation: addNewConversation
    getAllConversations: getAllConversations
}
