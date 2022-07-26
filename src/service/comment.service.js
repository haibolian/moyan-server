const Comment = require('../model/comment.model');
const Speak = require('../model/speak.model');

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
    const { speakId } = body
    const res = await Comment.findAll({ where: { originId: speakId } })
    return {
      success: true,
      message: '获取成功',
      data: {
        list: res.map(item => item.dataValues)
      }

    }
  }
}

module.exports = new CommentService();
