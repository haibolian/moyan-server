const jwt = require('jsonwebtoken');
const {
  createUser,
  getUserInfo
} = require('../service/user.service')

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
    const { password, ...res } = await getUserInfo(username);
    console.log('res', res);
    const token = jwt.sign(res, process.env.JWT_SECRET, { expiresIn: '1d' })
    return ctx.body = {
      message: '登录成功',
      data: {
        token
      },
      success: true
    }
  }

  async getUser(ctx) {
    return ctx.body = {
      ...ctx.state.user
    }
  }
  
}

module.exports = new UserController()