const jwt = require('jsonwebtoken');
const app = require('../app');
const {
  createUser,
  getUserInfo,
  updateUserInfo
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
    const accessToken = jwt.sign(res, process.env.JWT_SECRET, { expiresIn: '1d' })
    return ctx.body = {
      message: '登录成功',
      data: {
        accessToken,
        username,
        nickname: res.nickname,
        avatar: res.avatar,
        motto: res.motto
      },
      success: true
    }
  }

  async getUser(ctx) {
    const { password, ...res } = await getUserInfo(ctx.state.user.username);
    return ctx.body = {
      success: !!res,
      message: res ? '获取成功': '获取失败',
      data: res
    }
  }

  async updateInfo(ctx) {
    const res = await updateUserInfo(ctx.state.user.id, ctx.request.body)
    return ctx.body = {
      message: '更新成功',
      data: null,
      success: true
    }
  }
}

module.exports = new UserController()
