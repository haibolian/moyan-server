const Router = require('koa-router');
const { publish, del, getJournal, getList } = require('../controller/journal.controller');
const { auth } = require('../middleware/auth.middleware');
const router = new Router({ prefix: '/journal' })

router.post('/publish', auth, publish);
router.delete('/del', auth, del);
router.get('/getJournal', auth, getJournal);
router.get('/getList', auth, getList);

module.exports = router