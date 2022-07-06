const Router = require('koa-router')
const { register, login, getUser } = require('../controller/user.controller')
const {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
} = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware');

const router = new Router({ prefix: '/users' });

router.post('/register', userValidator, verifyUser, crpytPassword, register);
router.post('/login', userValidator, verifyLogin, login)
router.get('/getUser', auth, getUser)

module.exports = router