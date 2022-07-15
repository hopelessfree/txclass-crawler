const { Admin: AdminModel } = require('../db/models')


class AdminService {
  async addAdmin(adminInfo) {
    const { username } = adminInfo;

    const result = await AdminModel.findOne({ where: { username } })

    if (result) {
      return await AdminModel.update(adminInfo, { where: { username } })
    }

    return await AdminModel.create(adminInfo)
  }

  async login(userInfo) {
    const { username, password } = userInfo;

    const userExist = await AdminModel.findOne({ where: { username } })

    if (userExist === null) {
      return 10003
    }

    const dbPassword = userExist.get('password')
    if (password !== dbPassword) {
      return 10004
    }

    const uid = userExist.get('id')

    return {
      uid,
      username,
    }
  }


}


module.exports = new AdminService()