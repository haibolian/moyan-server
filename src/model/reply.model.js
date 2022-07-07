const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Reply = seq.define('reply', {
  comment_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "挂载到的评论ID"
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "回复内容"
  },
  reply_type: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "回复类型（评论或回复）"
  },
  reply_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "回复目标ID （评论或回复的 ID）"
  },
  from_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "回复者ID"
  },
  to_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "被回复者ID"
  }
},{
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

// Reply.sync({ force: true })

module.exports = Reply