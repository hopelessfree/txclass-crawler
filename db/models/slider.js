const { STRING, INT } = require('../../config/db_type_config')
const seq = require('../connection/mysql_connect')


const Slider = seq.define(
  'slider',
  {
    cid: {
      comment: 'course ID',
      type: STRING,
      allowNull: false,
      unique: true,
    },
    href: {
      comment: '',
      type: STRING,
      allowNull: false,
    },
    imgUrl: {
      comment: 'course image url',
      type: STRING,
      allowNull: false,
    },
    title: {
      comment: 'course name',
      type: STRING,
      allowNull: false,
    },
    imgKey: {
      comment: 'qiniu image name',
      type: STRING,
      allowNull: false,
    },
    status: {
      comment: 'slider status',
      type: INT,
      allowNull: false,
      defaultValue: 1,
    },
  })

module.exports = Slider