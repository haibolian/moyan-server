const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const { transferTime } = require('./common-hook/transfer-time');
const User = require('./user.model');

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
  commentCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '评论数',
  },
  fromId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '说说所属用户id',
  }
})

Speak.belongsTo(User, {
  foreignKey: 'fromId',
  targetKey: 'id',
  // as: 'userInfo'
})

Speak.addHook('afterFind', (speak, options) => {
  transferTime(speak)
});
Speak.addHook('afterCreate', (speak, options) => {
  transferTime(speak)
})

// Speak.sync({ force: true })

module.exports = Speak