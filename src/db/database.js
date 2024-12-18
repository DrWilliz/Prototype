// Get the client
import mysql from 'mysql2/promise'

// Create the connection to database

export async function connection() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'KubelabDB',
    password: 'root',
  })
}
