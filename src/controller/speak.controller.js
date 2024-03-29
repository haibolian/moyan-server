const {
  publishSpeak, del, getAllSpeakByUserId
} = require('../service/speak.service')
class SpeakController {
  async publish(ctx) {
    ctx.body = await publishSpeak(ctx.state.user.id, ctx.request.body, ctx.request.files)
  }

  async del(ctx) {
    const { id } = ctx.request.query;
    const res = await del(id)
    ctx.body = res
  }

  async getAll(ctx) {
    const { pageNum = 1, pageSize = 5  } = ctx.request.query;
    const userId = ctx.request.query.userId || ctx.state.user.id;
    const res = await getAllSpeakByUserId(userId, pageNum * 1, pageSize * 1);
    ctx.body = {
      success: true,
      message: '获取成功',
      data: res
    }
  }
}

module.exports = new SpeakController()