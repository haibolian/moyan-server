const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const dayjs = require('dayjs')
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
    get() {
      return this.getDataValue('fromId') * 1;
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const createdAt = this.getDataValue('createdAt')
      return dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')
    },
  },
}, {
  updatedAt: false
})

Speak.belongsTo(User, {
  foreignKey: 'fromId',
  targetKey: 'id',
})

// Speak.sync({ force: true })

module.exports = Speak