const {
  createTodo, updateTodo, getList, del, getTagMap
} = require('../service/todo.service')
class TodoController {
  async create(ctx) {
    ctx.body = await createTodo(ctx.state.user.id, ctx.request.body)
  }

  async update(ctx) {
    ctx.body = await updateTodo(ctx.request.body)
  }

  async getList(ctx) {
    ctx.body = await getList(ctx.request.query)
  }
  async del(ctx) {
    const res = await del(ctx.request.query)
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

module.exports = new TodoController()