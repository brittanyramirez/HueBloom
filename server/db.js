import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// this creates a connection pool to the MySQL database
// a pool allows multiple connections and is more efficient than a single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;