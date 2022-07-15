const { CourseTab: CourseTabModel } = require('../db/models')

class CourseTabServer {
  async addCourseTab(data) {
    const { cid } = data
    const result = await CourseTabModel.findOne({ where: { cid } })

    if (result) {
      return await CourseTabModel.update(data, { where: { cid } })
    }

    return await CourseTabModel.create(data)
  }

  async getCourseFieldData() {
    return await CourseTabModel.findAll({
      attributes: {
        exclude: ['cid']
      }
    })
  }
}

module.exports = new CourseTabServer()