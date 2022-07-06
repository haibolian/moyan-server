const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Speak = seq.define('speak', {
  content: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '说说内容',
  },
  images: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    comment: '说说图片', 
  },
  from_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '说说所属用户id',
  },
  from_nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '说说所属用户昵称',
  }
})

// Speak.sync({ force: true })

module.exports = Speak