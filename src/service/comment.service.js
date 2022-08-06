const Comment = require('../model/comment.model');
const Speak = require('../model/speak.model');
const User = require('../model/user.model');

class CommentService {
  async create(body) {
    const { content, originId, originType, fromId } = body
    const res = await Comment.create({
      content,
      originId: originId,
      originType: originType,
      fromId: fromId
    });
    if(res?.dataValues) this.increaseCommentCount(originId)
    return res?.dataValues;
  }

  async del(body) {
    const { id, originId } = body
    const res = await Comment.destroy({ where: { id }})
    if(res) this.decreaseCommentCount(originId)
    return {
      data: id,
      success: true,
      message: '删除成功',
    }
  }
  // 增加评论数
  increaseCommentCount(originId) {
    Speak.increment('commentCount', { where: { id: originId }})
  }
  // 减少评论数
  decreaseCommentCount(originId) {
    Speak.decrement('commentCount', { where: { id: originId } })
  }
  // 获取所有评论
  async getAll(body) {
    const { speakId, pageNum = 1, pageSize = 100 } = body
    const { count, rows } = await Comment.findAndCountAll({
      where: { originId: speakId  },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      order: [['createdAt', 'DESC']],
      include: [{
        attributes: ['id', 'nickname', 'avatar'], 
        model: User,
        as: 'from'
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
