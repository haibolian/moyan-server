const categoryService = require('../service/category.service')

class CategoryController {
  async create(ctx) {
    ctx.request.body.userId = ctx.state.user.id
    const res = await categoryService.create(ctx.request.body)
    ctx.body = res
  }

  async del(ctx) {
    const res = await categoryService.del(ctx.request.query);
    ctx.body = res
  }

  async getAll(ctx) {
    const userId = ctx.request.query.userId || ctx.state.user.id
    const res = await categoryService.getAll(userId);
    ctx.body = res
  }
}

module.exports = new CategoryController()
