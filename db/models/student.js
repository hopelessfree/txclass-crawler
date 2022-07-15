const { STRING, INT, TEXT } = require('../../config/db_type_config')
const seq = require('../connection/mysql_connect')

const Student = seq.define(
  'student',
  {
    sid: {
      comment: 'student ID',
      type: INT,
      allowNull: false,
      unique: true,
    },
    studentImg: {
      comment: 'student image url',
      type: STRING,
      allowNull: false,
    },
    studentName: {
      comment: 'student name',
      type: STRING,
      allowNull: false,
    },
    intro: {
      comment: 'student introduction',
      type: TEXT,
      allowNull: false,
    },
    courseName: {
      comment: 'the course name of student which student concerns',
      type: STRING,
      allowNull: false,
    },
    courseLink: {
      comment: 'the link of the course which the student concerned',
      type: STRING,
      allowNull: false,
    },
    studentImgKey: {
      comment: 'qiniu student image name',
      type: STRING,
      allowNull: false,
    },
    status: {
      comment: 'student status',
      type: INT,
      allowNull: false,
      defaultValue: 1,
    },
  },
)

module.exports = Student