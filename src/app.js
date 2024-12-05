import express from 'express'
import session from 'express-session'
import bcrypt from 'bcrypt'
import { connection } from './db/database.js'
import { getUsername, getUsers, getUserPW, getUserById, getUserEmail } from './models/UserModel.js'
import cors from 'cors'
const app = express()
const PORT = 7000
const db = await connection().catch((err) => {
  console.error('Database connection failed:', err)
  process.exit(1)
})
const router = express.Router()
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow only the frontend origin (Vue)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ensure methods are allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers like Authorization
    credentials: true,
  }),
)

app.use(express.json())
app.use(
  session({
    secret: 'keyboard_copy_cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 12 * 60 * 60 * 1000, // 12 hours
    },
  }),
)
app.use(router)

app.get('/users', async (req, res) => {
  const users = await getUsers()
  return res.send(users)
})

app.get('/users/:User_ID', async (req, res) => {
  const user = await getUserById(req.params.User_ID)
  return res.send(user)
})

app.get('/emails', async (req, res) => {
  const email = await getUserEmail()
  return res.send(email)
})

app.get('/names', async (req, res) => {
  const name = await getUsername()
  return res.send(name)
})

app.get('/passwords', async (req, res) => {
  const password = await getUserPW()
  return res.send(password)
})

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const query = 'Insert INTO Users (Name, Email, Password) VALUES (?, ?, ?)'
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) throw err
      res.status(201).send('User Registered')
    })
  } catch (error) {
    res.status(500).send('Error registering user')
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  console.log(req)
  try {
    const [results] = await db.query('SELECT * FROM Users WHERE Email = ?', [email])

    if (results.length === 0) {
      return res.status(404).send('User not found')
    }

    const user = results[0]

    // Hash the stored password if it's not already hashed
    const hashedPassword = user.Password.startsWith('$2b$')
      ? user.Password
      : await bcrypt.hash(user.Password, 10)

    const isMatch = await bcrypt.compare(password, hashedPassword)

    if (isMatch) {
      req.session.userId = user.User_ID
      req.session.userName = user.Name
      req.session.isAdmin = user.IsAdmin

      res.status(200).send('Login successful')
    } else {
      res.status(401).send('Invalid credentials')
    }
  } catch (error) {
    console.error('Login route error:', error)
    res.status(500).send('Server error during login')
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Could not log out')
    }
    res.send('Logged out successfully')
  })
})

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}

// Example of protecting a route
app.get('/protected-route', isAuthenticated, (req, res) => {
  res.send('Access granted')
})

export default app

app.listen(PORT, () => {
  console.log(`We are listening. ${PORT}`)
  console.log('Database connected:', db !== null)
})
