const fs = require('fs')
const path = require('path')

const storeFile = (file, dir) => {
  const fileName = new Date().getTime() + '_' + file.name
  const reader = fs.createReadStream(file.path)
  const targetPath = path.join(__dirname, `../upload/${dir}`)
  if(!fs.existsSync(targetPath)) fs.mkdirSync(targetPath)
  const filePath = path.join(targetPath, fileName)
  const writer = fs.createWriteStream(filePath);
  reader.pipe(writer)
  return `/${dir}/${fileName}`
}

const storeFiles = (files, dir) => {
  if(Array.isArray(files)) {
    return JSON.stringify(files.map(file => storeFile(file, dir)))
  }

  return JSON.stringify([storeFile(files, dir)])
}

module.exports = {
  storeFile,
  storeFiles
}