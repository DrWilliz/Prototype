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

// A simple SELECT query
// try {
//   const [results, fields] = await connection.query('SELECT * FROM `Users`')

//   console.log(results) // results contains rows returned by server
//   console.log(fields) // fields contains extra meta data about results, if available
// } catch (err) {
//   console.log(err)
// }
