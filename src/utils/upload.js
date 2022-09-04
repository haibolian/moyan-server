const fs = require('fs')
const path = require('path')
const { COS_PUT_OBJECT, COS_DEL_MULTIPLE_OBJECT } =require('./cos-sdk')
const { getDate } = require('./useDate')
const { nanoid } = require('nanoid')

const storeFile = async (file, dir, location = 'COS') => {
  const suffix = file.name.split('.').pop()
  const fileName = `${nanoid(50)}.${suffix}`
  if(location === 'COS') {
    // 腾讯云 cos 存储
    return await COS_PUT_OBJECT(
      path.join(dir, fileName),
      fs.createReadStream(file.path),
      file.type
    )
  } else {
    // 本地存储
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
  if(!files) return {
    success: true,
    filesPath: null
  }
  const result = []
  const { y, m, d } = getDate()
  dir = `${dir}/${y}/${m}/${d}`
  if(Array.isArray(files)) {
    const urls = files.map(file => {
      return storeFile(file, dir)
    })
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

const deleteFiles = async (fileUrlList) => {
  const reg = url => url.replace(/https:\/\/listen-wind-1308522723.cos.ap-shanghai.myqcloud.com\//, '')
  const Objects = fileUrlList.map(url => ({ Key:  reg(url)}))
  return await COS_DEL_MULTIPLE_OBJECT(Objects)
}

module.exports = {
  storeFile,
  storeFiles,
  deleteFiles
}