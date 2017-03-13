const NODE_ENV = 'test'
const pgp = require( 'pg-promise' )()
const connectionString = `postgres://${process.env.USER}@localhost:5432/metrorail-${NODE_ENV}`
const db = pgp( connectionString )

module.exports = { db }
