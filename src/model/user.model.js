const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

// 创建模型(Model zd_user -> 表 zd_users)
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
  }
},{
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// 强制同步数据库(创建数据表)
// User.sync({ force: true })

module.exports = User
