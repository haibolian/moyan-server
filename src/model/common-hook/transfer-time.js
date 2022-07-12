const moment = require('moment')

const transferTime = (format = 'YYYY-MM-DD HH:mm:ss') => {
  return (result, option) => {
    if(!result) return

    let time;
    if(Array.isArray(result)) {
      result.forEach(item => {
        time = item.dataValues?.created_at;
        item.dataValues && (item.dataValues.created_at = moment(time).format(format));
      })
    }else {
      time = result.dataValues.created_at;
      result.dataValues.created_at = moment(time, format);
    }
  }
}

module.exports = {
  transferTime
}
