const {
  publishSpeak, del, getAllSpeakByUserId
} = require('../service/speak.service')
class SpeakController {
  async publish(ctx) {
    const res = await publishSpeak(ctx.state.user, ctx.request.body)
    ctx.body = res
  }

  async del(ctx) {
    const { id } = ctx.request.params;
    const res = await del(id)
    if(res){
      ctx.body = {
        success: true,
        message: '删除成功',
        data: id
      }
    }
  }

  async getAll(ctx) {
    const { userId, pageNum, pageSize  } = ctx.request.query;
    const res = await getAllSpeakByUserId(userId, pageNum * 1, pageSize * 1);
    ctx.body = {
      success: true,
      message: '获取成功',
      data: res
    }
  }
}

module.exports = new SpeakController()