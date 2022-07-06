const Router = require('koa-router')
const { register, login, getUser, updateInfo } = require('../controller/user.controller')
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
router.put('/updateInfo', auth, updateInfo)

module.exports = router
