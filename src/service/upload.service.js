const fs = require('fs');
const path = require('path');

class UploadService {
  uploadAvatar(body, files) {
    const file = files.avatar
    const fileName = new Date().getTime() + file.name
    const reader = fs.createReadStream(file.path)
    const filePath = path.join(__dirname, '../upload/avatars/', fileName)
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer)
    return {
      filePath,
      fileUrl: `/upload/avatars/${fileName}`,
    }
  }
}

module.exports = new UploadService()