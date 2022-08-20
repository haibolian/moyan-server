const Journal = require("../model/journal.model")
const User = require("../model/user.model")
const Category = require("../model/category.model")

class JournalService {
  async publish({ userId, content, title, categoryId, editorMode, isDraft}) {
    const findUserResult = await User.findOne({ where: { id: userId } });
    if(!findUserResult) return { success: false, message: '用户不存在', data: null };
    const { nickname, avatar } = findUserResult.dataValues;
    const res = await Journal.create({
      fromId: userId, 
      content, 
      title, 
      categoryId,
      editorMode,
      isDraft
    });
    
    return {
      success: true,
      message: '发布成功',
      data: {
        ...res?.dataValues,
        user: {
          id: userId,
          nickname,
          avatar
        }
      } 
    }
  }
  
  async del(id) {
    const res = await Journal.destroy({ where: { id } })
    return {
      success: !!res,
      message: res ? '删除成功' : '删除失败',
      data: id
    }
  }

  async getJournal(id) {
    const res = await Journal.findOne({
      where: { id },
      include: [{
        attributes: ['id', 'nickname', 'avatar'],
        model: User,
        as: 'user'
      }, {
        attributes: ['id', 'name'],
        model: Category,
        as: 'category'
      }]
    })
    if(!res || !res.dataValues) {
      return {
        success: false,
        message: '日记不存在',
        data: null
      }
    }
    const { dataValues } = res
    dataValues.categoryName = dataValues.category.name;
    const { category, ...data } = dataValues
    return {
      success: true,
      message: '获取成功',
      data
    }
  }

  // 分页获取日记列表
  async getListByUserId({userId, pageNum, pageSize, categoryId}) {
    const { count, rows } = await Journal.findAndCountAll({
      attributes: ['id', 'title', 'content', 'categoryId', 'createdAt', 'commentCount'],
      where: Object.assign({ fromId: userId, isDraft: 0 }, categoryId ? { categoryId } : {}),
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      order: [['createdAt', 'DESC']],
      include: [{
        attributes: ['id', 'name'], 
        model: Category,
        as: 'category'
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

module.exports = new JournalService()