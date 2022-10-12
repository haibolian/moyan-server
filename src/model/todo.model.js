const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const dayjs = require('dayjs')

const Todo = seq.define('todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '待办标题',    
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '待办内容',
  },
  handleTime: {
    type: DataTypes.STRING(24),
    allowNull: true,
    comment: '处理时间', 
  },
  importance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '重要性',
  },
  category: {
    type: DataTypes.STRING(16),
    allowNull: false,
    defaultValue: 0,
    comment: '类别',
  },
  done: {
    type: DataTypes.TINYINT,
    defaultValue: false,
    comment: '已处理',
  },
  progress: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    comment: '进度',
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户id',
    get() {
      return this.getDataValue('userId') * 1;
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
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const updateAt = this.getDataValue('updateAt')
      return dayjs(updateAt).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}, {
  timestamps: true
})

// Todo.sync({ force: true })

module.exports = Todo