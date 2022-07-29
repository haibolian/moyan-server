const replyService = require('../service/reply.service')

class CommentController {
  async publish(ctx) {
    const res = await replyService.create(ctx.request.body)
    ctx.body = res
  }

  async del(ctx) {
    const res = await replyService.del(ctx.request.query);
    ctx.body = res
  }

  async getAll(ctx) {
    const res = await replyService.getAll(ctx.request.query);
    ctx.body = res
  }
}

module.exports = new CommentController()
