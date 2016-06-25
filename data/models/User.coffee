mongoose = require('mongoose')
Schema = mongoose.Schema
bcrypt = require('bcrypt-nodejs')


userSchema = new Schema({
    firstName: String
    lastName: String
    email: String
    username: String
    password: String
    _ownedGroups: [{ type: Schema.Types.ObjectId, ref: 'conversation' }]
})

userSchema.methods.encryptPassword = ->
    @password = bcrypt.hashSync(@password, bcrypt.genSaltSync(8), null)
    @

userSchema.methods.validPassword = (password) ->
    bcrypt.compareSync(password, @password)

module.exports = mongoose.model('user', userSchema)
