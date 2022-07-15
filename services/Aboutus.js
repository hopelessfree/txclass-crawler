const { Aboutus: AboutusModel } = require('../db/models')

class AboutusService {
  async addAboutus(data) {
    const { aid } = data

    const result = await AboutusModel.findOne({ where: { aid } })

    if (result) {
      return await AboutusModel.update({ where: { aid } })
    }

    return await AboutusModel.create(data)
  }
}

module.exports = new AboutusService()

