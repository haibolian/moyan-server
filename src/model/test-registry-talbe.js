const User = require('./user.model')
const Speak = require('./speak.model')
const Category = require('./category.model')
const Journal = require('./journal.model')
const Reply = require('./reply.model')
const Comment = require('./comment.model')


User.sync({ force: true })
Speak.sync({ force: true })
Journal.sync({ force: true })
Reply.sync({ force: true })
Comment.sync({ force: true })
Category.sync({ force: true })
