const { uploadAvatar } = require('../service/upload.service');

class UploadController {
  async uploadAvatar(ctx) {
    const { body, files } = ctx.request
    const res = uploadAvatar(body, files)
    ctx.body = {
      success: true,
      message: '上传成功',
      data: res.fileUrl,
    }
  } 
}

module.exports = new UploadController()