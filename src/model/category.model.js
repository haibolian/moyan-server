const { DataTypes } = require('sequelize')
const seq = require('../db/seq');
const { transferTime } = require('./common-hook/transfer-time');
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
  }
}, {
  updatedAt: false
})

Category.belongsTo(User, {
  foreignKey: 'fromId',
  targetKey: 'id',
  as: 'user'
})

Category.addHook('afterFind', (comment, options) => {
  transferTime(comment)
});
Category.addHook('afterCreate', (comment, options) => {
  transferTime(comment)
})

// Category.sync({ force: true })

module.exports = Category