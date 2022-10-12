const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const dayjs = require('dayjs')
const User = require('./user.model');

const Reply = seq.define('reply', {
  commentId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "挂载到的评论ID"
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "回复内容"
  },
  replyType: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "回复类型（评论或回复）--- 0: 评论  1: 回复"
  },
  replyId: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "回复目标ID （评论或回复的 ID）"
  },
  fromId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "回复者ID"
  },
  toId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "被回复者ID"
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

Reply.belongsTo(User, {
  foreignKey: 'fromId',
  targetKey: 'id',
  as: 'from'
})
Reply.belongsTo(User, {
  foreignKey: 'toId',
  targetKey: 'id',
  as: 'to'
})
Reply.belongsTo(Reply, {
  foreignKey: 'replyId',
  targetKey: 'id',
  as: 'toReply'
})

// Reply.sync({ force: true })

module.exports = Reply