const Router = require('koa-router');
const { publish, del, getAll } = require('../controller/speak.controller');
const { auth } = require('../middleware/auth.middleware');
const router = new Router({ prefix: '/speak' })

router.post('/publish', auth, publish);
router.delete('/del/:id', auth, del);
router.get('/getAll', auth, getAll);

module.exports = router