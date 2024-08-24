import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

//for local db
// export const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// for deployment
const dbUrl = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.MYSQL_DATABASE}`

export const db = mysql.createConnection(dbUrl);