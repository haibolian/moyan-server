
const jwt = require('jsonwebtoken');
const { tokenExpiredError } = require('../constant/err.type');

const auth = async (ctx, next) => {
  const { authorization = ''} = ctx.headers;
  const token = authorization.replace('Bearer ', '');
  try {
    const { iat, exp, ...user } = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        return ctx.body = tokenExpiredError
      case 'JsonWebTokenError':
        return ctx.body = invalidToken
    }
  }
  next()
}

module.exports = {
  auth
}