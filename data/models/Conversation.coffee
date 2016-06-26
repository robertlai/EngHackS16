mongoose = require('mongoose')
Schema = mongoose.Schema

conversationSchema = new Schema({
    title: String
    _owner: { type: Schema.Types.ObjectId, ref: 'user' }
    _rootNode: { type: Schema.Types.ObjectId, ref: 'message' }
})

module.exports = mongoose.model('conversation', conversationSchema)
