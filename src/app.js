import express from 'express'
import { getUsers } from './models/UserModel.js'
import { getUserById } from './models/UserModel.js'
const app = express()
const PORT = 7000

app.get('/users', async (req, res) => {
  const users = await getUsers()
  return res.send(users)
})

app.get('/users/:User_ID', async (req, res) => {
  const user = await getUserById(req.params.User_ID)
  return res.send(user)
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
