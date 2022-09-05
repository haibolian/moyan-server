const { storeFiles, deleteFiles } = require('../utils/upload')
const Speak = require("../model/speak.model")
const User = require("../model/user.model")

class SpeakService {
  async publishSpeak(id, { content }, { images }) {
    const findUserResult = await User.findOne({ where: { id } });
    if(!findUserResult) return { success: false, message: '用户不存在', data: null };
    const { nickname, avatar } = findUserResult.dataValues;
    // 存图片
    const { errFiles, sucFiles } = await storeFiles(images, id + '/speak/')

    if(images && errFiles.length) {
      return {
        success: false,
        message: '存储出现了点问题！',
        data: null
      }
    }
    const imageURls_JSON = JSON.stringify(
      sucFiles.map(sucFile => sucFile[1])
    )
    const res = await Speak.create({ fromId: id, content, images: imageURls_JSON},{
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
    const speak = await Speak.findOne({ where: { id } })
    if(!speak) return {
      success: false,
      message: '删除失败，未找到该说说',
      data: id
    }
    const { dataValues: { images } } = speak
    const res = await Speak.destroy({ where: { id } })
    res && images &&  deleteFiles(JSON.parse(images))
    return {
      success: !!res,
      message: res ? '删除成功' : '删除失败',
      data: id
    }
  }

  async getAllSpeakByUserId(userId, pageNum, pageSize) {
    const { count, rows } = await Speak.findAndCountAll({
      attributes: ['id', 'content', 'images', 'fromId', 'createdAt', 'commentCount'],
      where: { fromId: userId },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      order: [['createdAt', 'DESC']],
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