const Router = require('koa-router');
const { auth } = require('../middleware/auth.middleware');
const { uploadAvatar, vditorFiles } = require('../controller/upload.controller');

const router = new Router({ prefix: '/upload' });

router.post('/avatar', auth, uploadAvatar);

router.post('/vditor', auth, vditorFiles)

module.exports = router;
