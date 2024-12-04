import express from 'express'
const app = express()
const PORT = 7000
// const db = import('/database.js') 

import mysql from 'mysql2/promise';
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'KubelabDB',
  password: 'root'
})

let users = db.query (
  'SELECT * FROM `users`'
)

let messages = {
  1: {
    id: '1',
    text: 'Hello, World.',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'Goodbye, World.',
    userId: '2',
  },
}

app.get('/users', (req, res) => {
  return res.send(Object.values(users))
})

app.get('/users/:userId', (req, res) => {
  return res.send(users[req.params.userId])
})

app.get('/messages', (req, res) => {
  return res.send(Object.values(messages))
})

app.get('/messages/:messageId', (req, res) => {
  return res.send(messages[req.params.messageId])
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
