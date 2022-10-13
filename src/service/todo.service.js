const Todo = require('../model/todo.model');
const { Op } =require('sequelize');
const dayjs = require('dayjs');

class TodoService {
  async createTodo(userId, { day = dayjs().format('YYYY-MM-DD') }) {
    const res = await Todo.create({
      title: '',
      content: '',
      handleTime: null,
      day,
      category: '#ff675d',
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

  async getList(userId, { day: end }) {
    const isToday = day => dayjs().format('YYYY-MM-DD') == day
    const res = await Todo.findAll({
      where: {
        userId,
        day: {
          [Op.between]: [isToday(end) ? '0' : end, end]
        }
      }
    })
    return {
      success: true,
      message: '获取成功',
      data: isToday(end) ? res.filter(todo => isToday(todo.day) ? true : !todo.done) : res
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