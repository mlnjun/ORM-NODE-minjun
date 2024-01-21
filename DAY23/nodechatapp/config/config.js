module.exports = {
  "development": {
    "username": process.env.DB_DEV_USER,
    "password": process.env.DB_DEV_PW,
    "database": process.env.DB_DEV_NAME,
    "host": "127.0.0.1",
    "port": Number(process.env.DB_DEV_PORT),
    "dialect": "mysql",
    "timezone":"+09:00"
  },
  "test": {
    "username": process.env.DB_TEST_USER,
    "password": process.env.DB_TEST_PW,
    "database": process.env.DB_TEST_NAME,
    "host": "127.0.0.1",
    "port": Number(process.env.DB_TEST_PORT),
    "dialect": "mysql",
    "timezone":"+09:00"
  },
  "production": {
    "username": process.env.DB_PRODUCT_USER,
    "password": process.env.DB_PRODUCT_PW,
    "database": process.env.DB_PRODUCT_NAME,
    "host": "127.0.0.1",
    "port": Number(process.env.DB_PRODUCT_PORT),
    "dialect": "mysql",
    "timezone":"+09:00"
  }
}