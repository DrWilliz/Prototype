import express from 'express'
const app = express()
const PORT = 7000
// const db = import('/database.js')
import mysql from 'mysql2/promise'

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'KubelabDB',
  password: 'root',
})

let users = await db.query('SELECT * FROM `Users`')

console.log(users)

let User_ID = await db.query('SELECT User_ID from `Users`')

console.log(User_ID)

app.get('/users', (req, res) => {
  return res.send(Object.values(users))
})

app.get('/users/:User_ID', (req, res) => {
  return res.send(users[req.params.User_ID])
})

app.get('/users', (req, res) => {
  return res.send('GET HTTP method on user resource')
})

app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource')
})

app.put('/users/userId', (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`)
})

app.delete('/users/userId', (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`)
})

app.listen(7000, () => console.log('We are listening. Port 7000.'))
