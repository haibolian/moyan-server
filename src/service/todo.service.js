const Todo = require('../model/todo.model');
const User = require('../model/user.model');

class TodoService {
  async createTodo(userId, body) {
    const res = await Todo.create({
      title: '',
      content: '',
      handleTime: null,
      category: '#ffcb6b',
      importance: 1,
      done: false,
      progress: 0,
      userId
    })
    const data = res
    return {
      success: !!data,
      message: !!data ? '创建成功' : '创建失败',
      data
    }
  }

  async del(body) {
    const res = await Category.destroy({
      where: { id: body.id }
    })
    return {
      success: !!res,
      message: !!res ? '删除成功' : '删除失败',
      data: body.id
    }
  }
  // 获取分类列表
  async getAll(userId) {
    const list = await Category.findAll({
      where: { fromId: userId },
      order: [['createdAt', 'DESC']],
      include: [{
        attributes: ['id', 'nickname', 'avatar'], 
        model: User,
        as: 'user'
      }],
    })
    for await(const category of list) {
      const count = await Journal.count({
        where: { fromId: userId, categoryId: category.id, isDraft: false  },
      })
      category.count = count
    }
    
    return {
      success: true,
      message: '获取成功',
      data: list
    }
  }
}

module.exports = new TodoService();
