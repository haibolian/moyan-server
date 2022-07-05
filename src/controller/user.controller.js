const jwt = require('jsonwebtoken');
const {
  createUser,
  getUserInfo
} = require('../service/user.service')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
  async register(ctx, next) {
    const { username, password } = ctx.request.body
    const user = await createUser(username, password)
    return ctx.body = {
      message: '',
      data: user,
      success: true
    }
  }
  
  async login(ctx){
    const { username } = ctx.request.body;
    const { password, ...res } = await getUserInfo(username)
    const token = jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
    return ctx.body = {
      message: '登录成功',
      data: {
        token
      },
      success: true
    }
  }
}

module.exports = new UserController()