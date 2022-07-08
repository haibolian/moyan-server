const Comment = require('../model/comment.model');

class CommentService {
  async create(body) {
    const { content, originId, originType, fromId } = body
    const res = await Comment.create({
      content,
      origin_id: originId,
      origin_type: originType,
      from_id: fromId
    });
    return res?.dataValues
  }
}

module.exports = new CommentService();
