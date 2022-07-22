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
}

module.exports = new CommentService();
