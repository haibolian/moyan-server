const {
  publish, del, getJournal, getAllByUserId
} = require('../service/journal.service')

class JournalController {
  async publish(ctx) {
    ctx.request.body.userId = ctx.state.user.id
    console.log('鸡你太美',ctx.request.body);
    ctx.body = await publish(ctx.request.body)
  }

  async del(ctx) {
    const { id } = ctx.request.query;
    const res = await del(id)
    ctx.body = res
  }

  async getJournal(ctx) {
    ctx.body = await getJournal(ctx.request.query.id)
  }

  async getAll(ctx) {
    const { pageNum = 1, pageSize = 5  } = ctx.request.query;
    const userId = ctx.request.query.userId || ctx.state.user.id;
    const res = await getAllByUserId(userId, pageNum * 1, pageSize * 1);
    ctx.body = {
      success: true,
      message: '获取成功',
      data: res
    }
  }
}

module.exports = new JournalController()