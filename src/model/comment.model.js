const { DataTypes } = require('sequelize')
const seq = require('../db/seq');

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
    comment: '评论者id'
  },
  originType: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '评论来源类型'
  },
  originId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '评论来源id'
  },
})

// Comment.sync({ force: true })

module.exports = Comment