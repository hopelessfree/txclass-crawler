const SliderModel = require('../db/models/slider')

class SliderService {
  async addSliderData(data) {

    const { cid } = data

    const result = await SliderModel.findOne({
      where: { cid }
    })

    if (result) {
      return await SliderModel.update(data, {
        where: { cid }
      })
    }

    return await SliderModel.create(data)
  }

  async getSliderData() {
    return SliderModel.findAll({
      attributes: {
        exclude: ['imgUrl']
      }
    })
  }

  async changeStatus(cid, status) {
    return await SliderModel.update({ status }, { where: { cid } })
  }
}


module.exports = new SliderService()