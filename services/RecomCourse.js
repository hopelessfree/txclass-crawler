const { RecomCourse: RecomCourseModel } = require("../db/models");


class RecomCourseService {
  async addRecomCourse(data) {
    const cid = data.cid

    const result = await RecomCourseModel.findOne({ where: { cid } })

    if (result) {
      return await RecomCourseModel.update(data, { where: { cid } })
    }

    return await RecomCourseModel.create(data)
  }

  async getRecomCourseData() {
    return await RecomCourseModel.findAll({
      attributes: {
        exclude: ['mainTitle', 'posterUrl', 'description', 'teacherImg']
      }
    })
  }

  async changeStatus(cid, status) {
    return await RecomCourseModel.update({ status }, { where: { cid } })
  }
}


module.exports = new RecomCourseService()