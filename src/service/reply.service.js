const Reply = require('../model/reply.model')
const Comment = require('../model/comment.model');
const User = require('../model/user.model');


class CommentService {
  async create(body) {
    const { content, commentId, replyType, replyId, fromId, toId } = body
    const res = await Reply.create({
      content, commentId, replyType, replyId, fromId, toId
    });
    if(res?.dataValues) this.increaseRepliesCountOfComment(commentId)
    return res?.dataValues;
  }

  async del(body) {
    const { id, originId } = body
    const res = await Reply.destroy({ where: { id }})
    if(res) this.decreaseRepliesCountOfComment(commentId)
    return {
      data: id,
      success: true,
      message: '删除成功',
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
  // 获取所有评论
  async getAll(body) {
    const { speakId, pageNum = 1, pageSize = 100 } = body
    const { count, rows } = await Reply.findAndCountAll({
      where: { originId: speakId  },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      order: [['createdAt', 'DESC']],
      include: [{
        attributes: ['id', 'nickname', 'avatar'], 
        model: User
      }],
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

module.exports = new CommentService();
