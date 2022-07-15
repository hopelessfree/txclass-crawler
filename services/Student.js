const StudentModel = require('../db/models/student')

class StudentService {
  async addStudentData(data) {
    const { sid } = data

    const result = await StudentModel.findOne({ where: { sid } })

    if (result) {
      return await StudentModel.update(data, { where: { sid } })
    }

    return await StudentModel.create(data)

  }
  async getStudentData() {
    return StudentModel.findAll({
      attributes: {
        exclude: ['studentImg']
      }
    })
  }

  async changeStatus(sid, status) {
    return await StudentModel.update({ status }, { where: { sid } })
  }

}

module.exports = new StudentService()
