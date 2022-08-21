const {
  publish, del, update, getJournal, getListByUserId
} = require('../service/journal.service')

class JournalController {
  async publish(ctx) {
    ctx.request.body.userId = ctx.state.user.id
    ctx.body = await publish(ctx.request.body)
  }

  async del(ctx) {
    const { id } = ctx.request.query;
    const res = await del(id)
    ctx.body = res
  }

  async update(ctx) {
    ctx.request.body.userId = ctx.state.user.id
    ctx.body = await update({ ...ctx.request.body })
  }

  async getJournal(ctx) {
    ctx.body = await getJournal(ctx.request.query.id)
  }

  async getList(ctx) {
    const { pageNum = 1, pageSize = 10, categoryId } = ctx.request.query;
    const userId = ctx.request.query.userId || ctx.state.user.id;
    const params = {
      pageNum: pageNum * 1,
      pageSize: pageSize * 1,
      userId,
      categoryId
    }
    const res = await getListByUserId(params);
    ctx.body = res
    }
}

module.exports = new JournalController()