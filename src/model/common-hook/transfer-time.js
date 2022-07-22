const moment = require('moment')

const transferTime = (result ,format = 'YYYY-MM-DD HH:mm:ss') => {
  if(!result) return
  let date;
  if(Array.isArray(result)) {
    result.forEach(item => {
      date = item.dataValues?.createdAt;
      item.dataValues && (item.dataValues.createdAt = moment(date).format(format));
    })
  }else {
    date = result.dataValues.createdAt;
    result.dataValues.createdAt = moment(date).format(format);
  }
}

module.exports = {
  transferTime
}
