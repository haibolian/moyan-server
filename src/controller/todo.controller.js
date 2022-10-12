const {
  createTodo, del, getTodoListByDay, getTagMap
} = require('../service/todo.service')
class TodoController {
  async create(ctx) {
    ctx.body = await createTodo(ctx.state.user.id, ctx.request.body)
  }

  // async del(ctx) {
  //   const { id } = ctx.request.query;
  //   const res = await del(id)
  //   ctx.body = res
  // }

  // async getAll(ctx) {
  //   const { pageNum = 1, pageSize = 5  } = ctx.request.query;
  //   const userId = ctx.request.query.userId || ctx.state.user.id;
  //   const res = await getAllSpeakByUserId(userId, pageNum * 1, pageSize * 1);
  //   ctx.body = {
  //     success: true,
  //     message: '获取成功',
  //     data: res
  //   }
  // }
}

module.exports = new TodoController()