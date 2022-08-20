const Router = require('koa-router');
const { auth } = require('../middleware/auth.middleware');
const { create, del, getAll } = require('../controller/category.controller');

const router = new Router({ prefix: '/category' });

router.post('/create', auth, create);
router.delete('/del', auth, del);
router.get('/getAll', auth, getAll)

module.exports = router