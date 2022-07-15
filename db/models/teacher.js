const { STRING, INT, TEXT, } = require('../../config/db_type_config')
const seq = require('../connection/mysql_connect')


const Teacher = seq.define(
  'teacher',
  {
    tid: {
      comment: "teacher ID",
      type: INT,
      allowNull: false,
      unique: true,
    },
    href: {
      comment: "the link to teacher detail page",
      type: STRING,
      allowNull: false,
    },
    teacherName: {
      comment: "teacher name",
      type: STRING,
      allowNull: false,
    },
    teacherImg: {
      comment: "teacher image url",
      type: STRING,
      allowNull: false,
    },
    courseCount: {
      comment: "course count of the teacher",
      type: INT,
      allowNull: false,
    },
    studentCount: {
      comment: "student count of the teacher",
      type: INT,
      allowNull: false,
    },
    intro: {
      comment: "intro introduction",
      type: TEXT,
      allowNull: false,
    },
    teacherImgKey: {
      comment: "qiniu teahcer image name",
      type: STRING,
      allowNull: false,
    },
    isStar: {
      comment: 'is the teacher a star teacher?',
      type: INT,
      defaultValue: 0,
      allowNull: false,
    },
    status: {
      comment: 'teahcer status',
      type: INT,
      allowNull: false,
      defaultValue: 1,
    },
  },
)

module.exports = Teacher