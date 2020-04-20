require("dotenv").config();

module.exports = {

    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql",
        operatorsAliases: false
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql",
        operatorsAliases: false

    },
    production: {
        use_env_variable: "JAWSDB_URL",
        dialect: "mysql"
    }
}