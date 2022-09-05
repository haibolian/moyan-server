const fs = require('fs');
const path = require('path');
const User = require('../model/user.model');
const { storeFiles } = require('../utils/upload')

class UploadService {
  async uploadAvatar(body, files) {
    const file = files.avatar
    const fileName = new Date().getTime() + '_' + file.name
    const fileUrl = `/avatars/${fileName}`
    const reader = fs.createReadStream(file.path)
    const filePath = path.join(__dirname, '../upload/avatars/', fileName)
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer)
    const res =  await User.update({ avatar: fileUrl }, { where: { id: body._userId } })
    console.log(res);
    return {
      res,
      filePath,
      fileUrl
    }
  }

  async uploadVditorImages({ images }) {
    const { errFiles, sucFiles } = await storeFiles(images)
    // 不能用 map，因为顺序未知
    const succMap = sucFiles.reduce((prev, [filename, url]) => {
      prev[filename] = url
      return prev
    }, {})
    return {
      msg: '',
      data: {
        errFiles,
        succMap: sucFiles
      }
    }
  }
}

module.exports = new UploadService()