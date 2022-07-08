const Router = require('koa-router');
const { auth } = require('../middleware/auth.middleware');
const { uploadAvatar } = require('../controller/upload.controller');

const router = new Router({ prefix: '/upload' });

router.post('/avatar', auth, uploadAvatar);

module.exports = router;