const Router = require('koa-router');
const { auth } = require('../middleware/auth.middleware');
const { validateQuery } = require('../middleware/comment.middleware');
const { publish, del, getAll } = require('../controller/comment.controller');

const router = new Router({ prefix: '/comment' });

router.post('/publish', auth, publish);
router.delete('/del', auth, del);
router.get('/getAll', auth, validateQuery, getAll)

module.exports = router