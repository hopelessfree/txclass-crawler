const AgencyInfoModel = require("../db/models/agencyInfo")

class AgencyInfoServer {
  async addAgencyInfo(data) {
    const id = 1

    const result = await AgencyInfoModel.findOne({
      where: { id }
    })

    if (result) {
      return await AgencyInfoModel.update(data, { where: { id } })
    }

    return await AgencyInfoModel.create(data)

  }
}


module.exports = new AgencyInfoServer()