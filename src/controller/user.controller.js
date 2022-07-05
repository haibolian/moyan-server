const {
  createUser
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
}

module.exports = new UserController()