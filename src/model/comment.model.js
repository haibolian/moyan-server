const { DataTypes } = require('sequelize')
const seq = require('../db/seq');

const Comment = seq.define('comment', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '评论内容'
  },
  from_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '评论者id'
  },
  origin_type: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '评论来源类型'
  },
  origin_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '评论来源id'
  },
},{
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
  // fromNickname: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   comment: '评论者昵称'
  // },
  // fromAvatar: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   comment: '评论者头像'
  // },
Comment.sync({ force: true })

module.exports = Comment