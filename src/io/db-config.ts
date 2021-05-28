import { Sequelize } from 'sequelize-typescript';

const config = process.env.NODE_MODE === 'production' ?
  {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbUserPassword: process.env.USER_PASSWORD,
    dbHots: process.env.HOST,
  }
  :
  {
    dbName: process.env.DEV_DB_NAME,
    dbUser: process.env.DEV_DB_USER,
    dbUserPassword: process.env.DEV_USER_PASSWORD,
    dbHots: process.env.DEV_HOST,
  }
const sequelize = new Sequelize({
  database: config.dbName,
  dialect: 'postgres',
  username: config.dbUser,
  password: config.dbUserPassword,
  modelPaths: [`${__dirname}/models`],
  logging: false,
})

export default sequelize