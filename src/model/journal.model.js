const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const { transferTime } = require('./common-hook/transfer-time');
const User = require('./user.model');
const Category = require('./category.model')

const Journal = seq.define('journal', {
  title: {
    type: DataTypes.STRING(),
    allowNull: false,
    comment: '日志标题'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '日志内容',
  },
  images: {
    type: DataTypes.STRING(),
    allowNull: true,
    comment: '日志图片', 
  },
  editorMode: {
    type: DataTypes.CHAR(3),
    allowNull: false,
    comment: '编辑模式',
  },
  isDraft: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    comment: '是否为草稿',
  },
  categoryId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '日志分类id',
    get() {
      return this.getDataValue('categoryId') * 1;
    }
  },
  commentCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '评论数',
  },
  fromId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '日志所属用户id',
    get() {
      return this.getDataValue('fromId') * 1;
    }
  }
})

Journal.belongsTo(User, {
  foreignKey: 'fromId',
  targetKey: 'id',
  as: 'user'
})

Journal.belongsTo(Category, {
  foreignKey: 'categoryId',
  targetKey: 'id',
  as: 'category'
})

Journal.addHook('afterFind', (journal, options) => {
  transferTime(journal)
});
Journal.addHook('afterCreate', (journal, options) => {
  transferTime(journal)
})

// Journal.sync({ force: true })

module.exports = Journal