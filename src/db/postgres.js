const { Pool } = require('pg');
const { parse } = require('pg-connection-string')

let config
  config = {
  database:'postgres',
  password:'postgres',
  user:'postgres',
}
if(process.env.NODE_ENV=='production')
{
  config = parse(process.env.DATABASE_URL)
  config.ssl = {
    rejectUnauthorized: false
  }
}

const databaseConnection = config
const pool = new Pool(databaseConnection)
pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW() as now', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log('CONNECTION SUCCESSFUL at '+result.rows[0].now)
    })
  })
module.exports = pool