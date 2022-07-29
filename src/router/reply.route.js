const Router = require('koa-router');
const { auth } = require('../middleware/auth.middleware');
const { publish, del, getAll } = require('../controller/reply.controller');

const router = new Router({ prefix: '/reply' });

router.post('/publish', auth, publish);
router.delete('/del', auth, del);
router.get('/getAll', auth, getAll)

module.exports = router