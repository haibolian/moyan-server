const Speak = require("../model/speak.modle")

class SpeakService {
  async publishSpeak(user, body) {
    const { id: ownerId, nickname: ownerNickname } = user
    const { content, images } = body
    
    const res = await Speak.create({ ownerId, ownerNickname, content })
    return res?.dataValues
  }
  
  async del(id) {
    const res = await Speak.destroy({ where: { id } })
    return res
  }

  async getAllSpeakByUserId(userId, pageNum, pageSize) {
    const { count, rows } = await Speak.findAndCountAll({
      attributes: ['id', 'content', 'images', 'ownerId', 'ownerNickname', 'createdAt'],
      where: { ownerId: userId },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1
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