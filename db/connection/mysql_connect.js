const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../../config/db_config')

const seq = new Sequelize(...MYSQL_CONF.conf, MYSQL_CONF.base)

seq.authenticate()
  .then(() => {
    console.log('MySQL server is connected !')
  })
  .catch((error) => {
    console.log("MySQL server is failed to be connected.", error)
  })


module.exports = seq