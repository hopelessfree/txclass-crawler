module.exports = {
  trimSpace,
  makeCrypto,
  returnInfo,
  qiniuUpload,
  startProcess,
}

const Qiniu = require('qiniu')
const nanoid = require('nanoid')
const cp = require('child_process')
const crypto = require('crypto')

const { resolve } = require('path')
const {
  qiniu,
  crypto: cryptoConfig,
} = require('../config/config')

function startProcess(options) {
  const
    script = resolve(__dirname, '../crawlers/' + options.file),
    child = cp.fork(script, [])

  let invoked = false

  child.on('message', (data) => {
    options.message(data)
  })

  child.on('exit', (code) => {
    if (invoked) { return }

    invoked = true
    options.exit(code)
  })

  child.on('error', (err) => {
    if (invoked) { return }

    invoked = true
    options.error(err)
  })

}

function qiniuUpload(options) {
  const
    mac = new Qiniu.auth.digest.Mac(qiniu.keys.AK, qiniu.keys.SK),
    conf = new Qiniu.conf.Config(),
    client = new Qiniu.rs.BucketManager(mac, conf),
    key = nanoid() + options.ext

  return new Promise((resolve, reject) => {
    client.fetch(
      options.url,
      options.bucket,
      key,
      (error, ret, info) => {
        if (error) {
          reject(error)
        }
        else if (info.statusCode === 200) {
          resolve({ key })
        }
        else {
          reject(info)
        }
      }
    )
  })

}

function makeCrypto(str) {
  const _md5 = crypto.createHash('md5')
  const content = `str=${str}&secret${cryptoConfig.secret}`

  return _md5.update(content).digest('hex')
}

function returnInfo(errorInfo, data) {
  if (data) {
    errorInfo.data = data
  }

  return errorInfo
}

function trimSpace(str) {
  return str.replace(/\s+/g, '')
}