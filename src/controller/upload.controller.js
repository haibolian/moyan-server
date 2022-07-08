const { uploadAvatar } = require('../service/upload.service');

class UploadController {
  async uploadAvatar(ctx) {
    const { body, files } = ctx.request
    body._userId = ctx.state.user.id
    const res = await uploadAvatar(body, files)
    ctx.body = {
      success: true,
      message: '上传成功',
      data: res.fileUrl,
    }
  } 
}

module.exports = new UploadController()