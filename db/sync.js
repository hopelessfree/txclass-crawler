require('./models')
const seq = require('./connection/mysql_connect')


seq.authenticate()
  .then(() => {
    console.log('MySQL server is connected !')
  })
  .catch((error) => {
    console.log("MySQL server is failed to be connected.", error)
  })

seq
  .sync(
    {
      // force: true,
    }
  )
  .then(() => {
    console.log('The table has been synchronised into database successfully.')
    process.exit()
  })
  .catch(() => {

  })