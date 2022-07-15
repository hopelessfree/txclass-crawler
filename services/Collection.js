const CollectionModel = require('../db/models/collection')


class CollectionService {
  async addCollection(data) {
    const cid = data.cid

    const result = await CollectionModel.findOne({ where: { cid } })

    if (result) {
      return await CollectionModel.update(data, { where: { cid } })
    }

    return await CollectionModel.create(data)
  }

  async getCollectionData() {
    return await CollectionModel.findAll({
      attributes: {
        exclude: ['posterUrl', 'courseIdList']
      }
    })
  }

  async changeStatus(cid, status) {
    return await CollectionModel.update({ status }, { where: { cid } })
  }
}

module.exports = new CollectionService()