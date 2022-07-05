const jwt = require('jsonwebtoken');

const auth = async (ctx, next) => {
  const authorization = ctx.header.authorization || '';
  const token = authorization.replace('Bearer ', '');
  const user = jwt.verify(token, process.env.JWT_SECRET);
  debugger
}