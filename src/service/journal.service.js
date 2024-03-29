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
      data: res?.dataValues?.id
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

  async update({ id, title, content, categoryId, editorMode, isDraft }) {
    if(!id) return { success: false, message: 'id不能为空', data: null }
    const data = await Journal.update({ title, content, categoryId, editorMode, isDraft }, { where: { id } })
    const res = data[0] === 1
    return {
      success: res,
      message: res ? '更新成功' : '更新失败',
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
    dataValues.categoryId = dataValues.category.id;
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
      attributes: ['id', 'title', 'content', 'categoryId', 'createdAt', 'updatedAt', 'commentCount'],
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
    for(const row of rows){
      row.dataValues.categoryName = row.dataValues.category.name;
      delete row.dataValues.category;
    }
    return {
      success: !!rows,
      message: !!rows ? '获取成功' : '获取失败',
      data:{
        pageNum,
        pageSize,
        total: count,
        list: rows?.map(item => item.dataValues)
      }
    }
  }
}

module.exports = new JournalService()