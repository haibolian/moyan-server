const Router = require('koa-router');
const { auth } = require('../middleware/auth.middleware');
const { publish, del } = require('../controller/comment.controller');

const router = new Router({ prefix: '/comment' });

router.post('/publish', auth, publish);
router.delete('/del', auth, del);

module.exports = router