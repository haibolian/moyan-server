const Router = require('koa-router');
const { auth } = require('../middleware/auth.middleware');
const { publish } = require('../controller/comment.controller');

const router = new Router({ prefix: '/comment' });

router.post('/publish', auth, publish)

module.exports = router