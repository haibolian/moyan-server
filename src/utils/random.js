/**
 * 生成一个用不重复的ID
 * @param { Number } randomLength 
 */
function getRandomStr(randomLength = 5){
  return Number(Math.random().toString().substr(2,randomLength) + Date.now()).toString(36)
}

module.exports = {
  getRandomStr
}