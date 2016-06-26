User = require('./models/User')


createNewUser = (options, next) ->
    newUser = new User(options)
        .encryptPassword()
        .save next


module.exports = {
    createNewUser: createNewUser
}
