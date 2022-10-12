const { uploadAvatar, uploadVditorImages } = require('../service/upload.service');

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
  
  async vditorFiles(ctx) {
    // ctx.body = await uploadVditorImages(ctx.request.files)
    ctx.body = {
      msg: '',
      code: 0,
      data: {
        originalURL: ctx.request.body.url,
        url: 'https://listen-wind-1308522723.cos.ap-shanghai.myqcloud.com/1/speak/2022/9/5/hp-6MOyV0-TU-qNds-qRfdS0g9mqv_XWDeQAa1U2OKDeVT19MS.jpeg'
      }

    }
  }
}

module.exports = new UploadController()