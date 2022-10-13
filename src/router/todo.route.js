const Router = require('koa-router');
const { create, update, del, getList } = require('../controller/todo.controller');
const { auth } = require('../middleware/auth.middleware');
const router = new Router({ prefix: '/todo' })

router.post('/create', auth, create);
router.post('/update', auth, update);
router.get('/getList', auth, getList)
router.delete('/del', auth, del);

module.exports = router