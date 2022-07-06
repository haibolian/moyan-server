const Router = require('koa-router');
const { publish } = require('../controller/speak.controller');
const { auth } = require('../middleware/auth.middleware');
const router = new Router({ prefix: '/speak' })

router.post('/publish', auth, publish)

module.exports = router