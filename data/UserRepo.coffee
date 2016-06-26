User = require('./models/User')


createNewUser = (options, next) ->
    newUser = new User(options)
        .encryptPassword()
        .save next

getUserByUserName = (username, next) ->
    User.findOne { username: username },
    next


module.exports = {
    createNewUser: createNewUser
    getUserByUserName: getUserByUserName
}
