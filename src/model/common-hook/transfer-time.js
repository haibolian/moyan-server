const moment = require('moment')

const transferTime = (result ,format = 'YYYY-MM-DD HH:mm:ss') => {
  if(!result) return
  let date;
  if(Array.isArray(result)) {
    result.forEach(item => {
      date = item.dataValues?.created_at;
      item.dataValues && (item.dataValues.created_at = moment(date).format(format));
    })
  }else {
    date = result.dataValues.created_at;
    result.dataValues.created_at = moment(date).format(format);
  }
}

module.exports = {
  transferTime
}
