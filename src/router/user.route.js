const Router = require('koa-router')
const { register } = require('../controller/user.controller')
const {
  userValidator,
  verifyUser,
  crpytPassword
} = require('../middleware/user.middleware')

const router = new Router({ prefix: '/users' });

router.post('/register', userValidator, verifyUser, crpytPassword, register)

module.exports = router