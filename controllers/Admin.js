const { admin: adminConfig } = require('../config/config')
const { addAdmin, login } = require('../services/Admin')
const { LOGIN } = require('../config/error_config');
const { returnInfo, trimSpace, makeCrypto } = require('../libs/utils');


class Admin {
  async createAdmin() {

    adminConfig.password = makeCrypto(adminConfig.password)

    const result = await addAdmin(adminConfig)

    if (result) {
      console.log('admin create success')
    }
    else {
      console.log('admin create fail')
    }
  }

  async loginAction(ctx, next) {
    const { password, username } = ctx.request.body;

    if (!username || !password) {
      ctx.body = returnInfo(LOGIN.INVALID_OPERATION)
      return
    }

    if (trimSpace(username).length <= 0) {
      ctx.body = returnInfo(LOGIN.INVALID_USERNAME_LENGTH)
      return
    }
    if (trimSpace(password).length <= 0) {
      ctx.body = returnInfo(LOGIN.INVALID_PASSWORD_LENGTH)
      return
    }

    const userInfo = {
      username: trimSpace(username),
      password: makeCrypto(trimSpace(password)),
    }

    const result = await login(userInfo)

    if (result === 10003) {
      return ctx.body = returnInfo(LOGIN.USERNAME_NOT_EXIST)
    }

    if (!ctx.session.userInfo) {
      ctx.session.userInfo = result
    }

    if (result === 10004) {
      return ctx.body = returnInfo(LOGIN.PASSWORD_ERROR)
    }

    return ctx.body = returnInfo(LOGIN.SUCCESS, ctx.session.userInfo)
  }

  async loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
      return ctx.body = returnInfo(LOGIN.LOGIN_STATUS)
    }

    return ctx.body = returnInfo(LOGIN.NOT_LOGIN_STATUS)
  }

  async logoutAction(ctx, next) {
    delete ctx.session.userInfo
    ctx.body = returnInfo(LOGIN.LOGOUT_SUCCESS)
  }
}


module.exports = new Admin()