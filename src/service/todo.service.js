const Todo = require('../model/todo.model');
const { Op } =require('sequelize')

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

  async updateTodo(body) {
    const { id, userId, ...todoInfo } = body
    const data = await Todo.update(todoInfo, { where: { id } })
    const res = data[0] === 1
    return {
      success: res,
      message: res ? '更新成功' : '更新失败',
      data: id
    }
  }

  async getList({ day }) {
    const start = new Date(day + ' 00:00:00');
    const end = new Date(day + ' 23:59:59');
    const res = await Todo.findAll({
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      }
    })
    return {
      success: true,
      message: '获取成功',
      data: res
    }
  }


  async del({ id }) {
    if(!id) return {
      success: false,
      message: 'id 不能为空',
      data: null
    }
    const res = await Todo.destroy({
      where: { id: id.split(',') }
    })
    return {
      success: !!res,
      message: !!res ? '删除成功' : '删除失败',
      data: id
    }
  }
}

module.exports = new TodoService();