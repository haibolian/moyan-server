const fs = require('fs')
const path = require('path')
const { COS_PUT_OBJECT, COS_DEL_MULTIPLE_OBJECT } =require('./cos-sdk')
const { getDate } = require('./useDate')
const { nanoid } = require('nanoid')

const storeFile = async (file, dir, location = 'COS') => {
  // 使用 nanoid 重命名
  const suffix = file.name.split('.').pop()
  const newFileName = `${nanoid(50)}.${suffix}`
  if(location === 'COS') {
    // 腾讯云 cos 存储
    const Key = path.join(dir, newFileName)
    const Body = fs.createReadStream(file.path)
    const [err, url] = await COS_PUT_OBJECT(Key, Body, file.type)
      .then(url => [null, url], err => [err, null])
    return {
      success: !err,
      filename: file.name,
      url
    }
  } else {
    // 本地存储 - 暂时用不到，所以返回值没做修改。
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
  const errFiles = []
  const sucFiles = []

  const { y, m, d } = getDate()
  dir = `${dir}/${y}/${m}/${d}`
  if(!Array.isArray(files)) files = [files]
  const storeFileResults= files.map(file => storeFile(file, dir))
  for await (const storeFileResult of storeFileResults) {
    const { success, filename, url } = storeFileResult
    success ? sucFiles.push([filename, url]) : errFiles.push(filename)
  }
  return {
    errFiles,
    sucFiles
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