const commentService = require('../service/comment.service')

class CommentController {
  async publish(ctx) {
    const res = await commentService.create(ctx.request.body)
    ctx.body = {
      success: true,
      message: '评论成功',
      data: res,
    }
  }

  async del(ctx) {
    const res = await commentService.del(ctx.request.query)
    ctx.body = res
  }
}

module.exports = new CommentController()
