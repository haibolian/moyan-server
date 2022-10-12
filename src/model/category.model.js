const { DataTypes } = require('sequelize')
const seq = require('../db/seq');
const dayjs = require('dayjs')
const User = require('./user.model');

const Category = seq.define('category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '分类名称'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '分类描述'
  },
  fromId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '分类所属用户id',
    get() {
      return this.getDataValue('fromId') * 1;
    }
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '该分类下的日记数量'
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

Category.belongsTo(User, {
  foreignKey: 'fromId',
  targetKey: 'id',
  as: 'user'
})

// Category.sync({ force: true })

module.exports = Category