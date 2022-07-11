const { getRandomStr } = require('../utils/random')
const User = require('../model/user.model')

class UserService {
  async createUser(username, password) {
    const nickname = getRandomStr()
    const res = await User.create({ username, password, nickname })
    return res.dataValues
  }

  async getUserInfo(username = ''){
    const res = await User.findOne({
      where: { username }
    })
    return res?.dataValues
  }

  async updateUserInfo(id, userInfo) {
    const res = await User.update(userInfo, { where: { id } })
    console.log('update-res', res);
    return res
  }
}

module.exports = new UserService()