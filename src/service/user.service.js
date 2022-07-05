const User = require('../model/user.model')

class UserService {
  async createUser(username, password) {
    const res = await User.create({ username, password })
    return res.dataValues
  }

  async getUserInfo(username){
    const res = await User.findOne({
      where: { username }
    })
    return res
  }


}

module.exports = new UserService()