const { Pool } = require("pg")

module.exports = new Pool({
    user: 'lccaputo',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'lccaputo'
})