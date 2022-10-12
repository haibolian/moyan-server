const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const dayjs = require('dayjs')


const User = seq.define('user', {
  // id 会被sequelize自动创建, 管理
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名, 唯一',
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '密码',
  },
  nickname: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: '昵称',
  },
  avatar: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    comment: '头像',
  },
  motto: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '座右铭',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const createdAt = this.getDataValue('createdAt')
      return dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const updatedAt = this.getDataValue('updatedAt')
      return dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')
    },
  },
}, {
  timestamps: true
});

// 强制同步数据库(创建数据表)
//  User.sync({ force: true })

module.exports = User
