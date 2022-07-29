const Reply = require('../model/reply.model')
const Comment = require('../model/comment.model');
const User = require('../model/user.model');

const attributes = ['id', 'nickname', 'avatar'];
const model = User

class ReplyService {
  async create(body) {
    const { content, commentId, replyType, replyId, fromId, toId } = body
    const res = await Reply.create({
      content, commentId, replyType, replyId, fromId, toId
    })
    if(res?.dataValues) this.increaseRepliesCountOfComment(commentId)
    const from = await User.findOne({ attributes, where: { id: fromId }})
    const to = await User.findOne({ attributes, where: { id: toId }})
    const success = !!(res && res.dataValues)
    return {
      success,
      message: success ? '回复成功' : '回复失败',
      data: success ? {
        ...res.dataValues,
        from: from?.dataValues,
        to: to?.dataValues
      } : null
    }
  }

  async del(body) {
    const { id, commentId } = body
    const res = await Reply.destroy({ where: { id }})
    if(res) this.decreaseRepliesCountOfComment(commentId)
    return {
      data: id,
      success: !!res,
      message: res ? '删除成功' : '删除失败',
    }
  }
  // 增加评论数
  increaseRepliesCountOfComment(commentId) {
    Comment.increment('repliesCount', { where: { id: commentId }})
  }
  // 减少评论数
  decreaseRepliesCountOfComment(commentId) {
    Comment.decrement('repliesCount', { where: { id: commentId } })
  }

  // 获取所有回复
  async getAll(body) {
    const { commentId, pageNum = 1, pageSize = 100 } = body
    const { count, rows } = await Reply.findAndCountAll({
      where: { commentId },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      order: [['createdAt', 'DESC']],
      include: [{ attributes, model, as: 'from'},{ attributes, model, as: 'to' }],
    })
    
    return {
      success: true,
      message: '获取成功',
      data: {
        list: rows.map(item => item.dataValues),
        pageNum,
        pageSize,
        total: count
      }

    }
  }
}

module.exports = new ReplyService();
