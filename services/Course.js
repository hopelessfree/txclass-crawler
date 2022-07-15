const { Course: CourseModel } = require('../db/models');


class CourseService {
  async addCourseData(data) {
    const { cid } = data

    const result = await CourseModel.findOne({ where: { cid } })

    if (result) {
      return await CourseModel.update(data, { where: { cid } })
    }

    return await CourseModel.create(data)
  }

  async getCourses() {
    return await CourseModel.findAll({
      attributes: {
        exclude: ['createAt', 'updateAt']
      }
    }) || []
  }

  async changeField(cid, field) {
    const res = await CourseModel.update({ field }, { where: { cid } })

    return res[0]
  }

  async changeStatus(cid, status) {
    return await CourseModel.update({ status }, { where: { cid } })
  }

}


module.exports = new CourseService()