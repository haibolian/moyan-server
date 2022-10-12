const Router = require('koa-router');
const { create, del, getList } = require('../controller/todo.controller');
const { auth } = require('../middleware/auth.middleware');
const router = new Router({ prefix: '/todo' })

router.post('/create', auth, create);

// router.delete('/del', auth, del);

// router.get('/getList', auth, getList);

module.exports = router