mongoose = require('mongoose')
Schema = mongoose.Schema

messageSchema = new Schema({
    # _owner: { type: Schema.Types.ObjectId, ref: 'user' }
    content: String
    _children: [{ type: Schema.Types.ObjectId, ref: this }]
})

module.exports = mongoose.model('message', messageSchema)
