const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require('../constant/err.type')

const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    return ctx.body = userFormateError;
  }
  await next()
}

const verifyUser = async (ctx, next) => {
  const { username } = ctx.request.body
  try {
    const result = await getUserInfo(username)
    if(result) return ctx.body = userAlreadyExited
  } catch (error) {
    return ctx.body = userRegisterError
  }
  await next()
}

const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10)
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

const verifyLogin = async (ctx, next) => {
  const res = await getUserInfo(ctx.request.body.username)
  if(!res) return ctx.body = userDoesNotExist;
  const { password } = ctx.request.body;
  const isValid = bcrypt.compareSync(password, res.password)
  if(!isValid) return ctx.body = invalidPassword;
  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
}
