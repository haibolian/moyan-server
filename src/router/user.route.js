const Router = require('koa-router')
const { register, login } = require('../controller/user.controller')
const {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin
} = require('../middleware/user.middleware')

const router = new Router({ prefix: '/users' });

router.post('/register', userValidator, verifyUser, crpytPassword, register);
router.post('/login', userValidator, verifyLogin, login)

module.exports = router