const {
  create,
} = require('../service/comment.service')

class CommentController {
  async publish(ctx) {
    const res = await create(ctx.request.body)
    ctx.body = {
      success: true,
      message: '评论成功',
      data: res,
    }
  }
}

module.exports = new CommentController()
