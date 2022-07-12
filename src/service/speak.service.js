const Speak = require("../model/speak.modle")
const User = require("../model/user.model")

class SpeakService {
  async publishSpeak(id ,{ content }) {
    const findUserResult = await User.findOne({ where: { id } });
    if(!findUserResult) return { success: false, message: '用户不存在', data: null };
    const { nickname, avatar } = findUserResult.dataValues;
    const res = await Speak.create({ from_id: id, content },{
      include: [{
        attributes: ['id', 'nickname', 'avatar'],
        model: User
      }]
    });
    return {
      success: true,
      message: '发布成功',
      data: {
        ...res?.dataValues,
        user: {
          id,
          nickname,
          avatar
        }
      } 
    }
  }
  
  async del(id) {
    const res = await Speak.destroy({ where: { id } })
    return {
      success: !!res,
      message: res ? '删除成功' : '删除失败',
      data: id
    }
  }

  async getAllSpeakByUserId(userId, pageNum, pageSize) {
    const { count, rows } = await Speak.findAndCountAll({
      attributes: ['id', 'content', 'images', 'from_id', 'created_at'],
      where: { from_id: userId },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      order: [['created_at', 'DESC']],
      include: [{
        attributes: ['id', 'nickname', 'avatar'], 
        model: User
      }],
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows.map(item => item.dataValues)
    }
  }
}

module.exports = new SpeakService()