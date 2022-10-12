const { getRandomStr } = require('../utils/random')
const User = require('../model/user.model')

class UserService {
  async createUser(username, password) {
    const nickname = '用户' + getRandomStr();
    const avatar = '/avatars/default.webp';
    const res = await User.create({ username, password, nickname, avatar })
    return res
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