const { DataTypes } = require('sequelize')
const seq = require('../db/seq');
const dayjs = require('dayjs')
const User = require('./user.model');

const Comment = seq.define('comment', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '评论内容'
  },
  repliesCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '回复数量'
  },
  fromId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '评论者id',
    get() {
      return this.getDataValue('fromId') * 1;
    }
  },
  originType: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '评论来源类型'
  },
  originId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '评论来源id',
    get() {
      return this.getDataValue('originId') * 1;
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const createdAt = this.getDataValue('createdAt')
      return dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')
    },
  }
}, {
  updatedAt: false
})

Comment.belongsTo(User, {
  foreignKey: 'fromId',
  targetKey: 'id',
  as: 'from'
})

// Comment.sync({ force: true })

module.exports = Comment