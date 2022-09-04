const fs = require('fs')
const path = require('path')
const { COS_PUT_OBJECT } =require('./cos-sdk')

const storeFile = async (file, dir, location = 'COS') => {
  if(location === 'COS') {
    // 腾讯云 cos 存储
    return await COS_PUT_OBJECT(path.join(dir, file.name), fs.createReadStream(file.path), file.type)
  } else {
    // 本地存储
    const fileName = new Date().getTime() + '_' + file.name
    const reader = fs.createReadStream(file.path)
    const targetPath = path.join(__dirname, `../upload/${dir}`)
    if(!fs.existsSync(targetPath)) fs.mkdirSync(targetPath)
    const filePath = path.join(targetPath, fileName)
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer)
    return `/${dir}/${fileName}`   
  }
}

const storeFiles = async (files, dir) => {
  const result = []
  if(Array.isArray(files)) {
    const urls = files.map(file => storeFile(file, dir))
    for await (const url of urls) {
      result.push(url)
    }
  }else {
    const url = await storeFile(files, dir)
    result.push(url)
  }
  return {
    success: result.every(res => res),
    filesPath: JSON.stringify(result)
  }
}

module.exports = {
  storeFile,
  storeFiles
}