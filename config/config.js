const { REDIS_CONF } = require("./db_config");
const { isPrd } = require("./env_config");

module.exports = {
  qiniu: {
    keys: {
      AK: "v1ferV9eFavCmofoy43Pd8dmEFjeWX43_ggyFFXJ",
      SK: "FhnBagPmoWlfPvyXrw1dW8p6Wijii-Z-K4_pc9un",
    },
    bucket: {
      tximg: {
        bucket_name: "txclass-img-nothing",
        domian: "http://tximg.songxianwei.com/",
      }
    },
  },

  crawler: {
    url: {
      main: "https://msiwei.ke.qq.com/#tab=0&category=-1",
      course: "https://msiwei.ke.qq.com/#tab=1&category=-1",
      teacher: "https://msiwei.ke.qq.com/#tab=2&category=-1",
      aboutus: "https://msiwei.ke.qq.com/#tab=3&category=-1",
    }
  },

  session: {
    keys: ['a1!s2@d3#f4$_+g5%h6^'],
    name: 'txclass.sid',
    prefix: 'txclass.sess',
  },

  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },

  redis: {
    all: `${REDIS_CONF[1]}:${REDIS_CONF[0]}`
  },
  
  admin: {
    username: 'admin',
    password: 'admin',
  },

  crypto: {
    secret: 'JKl&*9lj2F@#3kflsAfkDfl',
  },

  corsOrigin: isPrd ? 'http://txclass-manager.songxianwei.com' : 'http://localhost:3001',
}
