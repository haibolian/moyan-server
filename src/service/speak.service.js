const Speak = require("../model/speak.modle")

class SpeakService {
  async publishSpeak(body) {
    const { id: from_id, nickname: from_nickname, content, images} = body
    const res = await Speak.create({ from_id, from_nickname, content })
    return res?.dataValues
  }
  
  async del(id) {
    const res = await Speak.destroy({ where: { id } })
    return res
  }

  async getAllSpeakByUserId(userId, pageNum, pageSize) {
    const { count, rows } = await Speak.findAndCountAll({
      attributes: ['id', 'content', 'images', 'from_id', 'from_nickname', 'created_at'],
      where: { from_id: userId },
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