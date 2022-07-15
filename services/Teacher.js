const TeacherModel = require('../db/models/teacher')

class TeacherService {
  async addTeacherData(data) {
    const tid = data.tid

    const result = await TeacherModel.findOne({ where: { tid } })

    if (result) {
      return await TeacherModel.update(data, { where: { tid } })
    }

    return await TeacherModel.create(data)
  }

  async getTeacherData() {
    return TeacherModel.findAll({
      attributes: {
        exclude: ['teacherImg']
      }
    })
  }

  async changeStatus(tid, status) {
    return await TeacherModel.update({ status }, { where: { tid } })
  }

  async selectStarTeacher(tid, isStar) {
    return await TeacherModel.update({ isStar }, { where: { tid } })
  }
}

module.exports = new TeacherService()