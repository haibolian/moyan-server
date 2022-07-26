const validateQuery = async (ctx, next) => {
  if(ctx.request.query.speakId) {
    await next();
  }else {
    ctx.body = {
      success: false,
      message: 'speakId 不能为空',
      data: null,
    }
  }
}

module.exports = {
  validateQuery,
}