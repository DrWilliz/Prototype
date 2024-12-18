import express from 'express'
import session from 'express-session'
import bcrypt from 'bcrypt'
import { connection } from './db/database.js'
import { getUsername, getUsers, getUserPW, getUserById, getUserEmail } from './models/UserModel.js'
import cors from 'cors'
import axios from 'axios'
import https from 'https'
import { sendPortainerToken } from './controllers/tokenController.js'
import { syncProjectsToDatabase } from './controllers/portainerController.js'
import { detectTemplateType } from './controllers/portainerController.js'
const app = express()
const PORT = 7777
const db = await connection().catch((err) => {
  console.error('Database connection failed:', err)
  process.exit(1)
})
const router = express.Router()
const url = 'https://portainer.kubelab.dk/api'
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow only the frontend origin (Vue)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ensures methods are allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // Allows custom headers (like authorization)
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
app.delete('/users/:User_ID', async (req, res) => {
  const user = await deleteUserById(req.params.User_ID)
  return res.send(user)
})

app.post('/create-stack', sendPortainerToken, async (req, res) => {
  try {
    const response = await axios.post(
      `${url}/stacks/create/swarm/string`,
      {
        fromTemplate: req.body.fromTemplate || false,
        name: req.body.name,
        stackFileContent: req.body.stackFileContent,
        swarmId: req.body.swarmId || 'v1pkdou24tzjtncewxhvpmjms',
      },
      {
        params: {
          endpointId: 5,
        },
        headers: {
          Authorization: `Bearer ${req.portainerToken}`,
          'Content-Type': 'application/json',
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      },
    )

    console.log(response.data)
    res.status(201).json({
      message: 'Stack created successfully',
      data: response.data,
    })
  } catch (error) {
    console.error('Creating stack failed:', error.response?.data || error.message)
    res.status(500).json({
      message: 'Failed to create stack',
      error: error.response?.data || error.message,
    })
  }
})

app.delete('/delete-stack', sendPortainerToken, async (req, res) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${url}/stacks/${req.body.id}`,
      params: {
        endpointId: 5,
      },
      headers: {
        Authorization: `Bearer ${req.portainerToken}`,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })

    res.status(200).send('Stack deleted successfully')
  } catch (error) {
    console.error('Deleted stack failed:', error.response?.data || error.message)
    res.status(500).send('Failed to delete stack')
  }
})

app.post('/stop', sendPortainerToken, async (req, res) => {
  console.log('Stop request body:', req.body)
  try {
    const response = await axios({
      method: 'post',
      url: `${url}/stacks/${req.body.id}/stop`,
      params: {
        endpointId: 5,
      },
      headers: {
        Authorization: `Bearer ${req.portainerToken}`,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })

    res.status(200).send('Stack stopped successfully')
  } catch (error) {
    console.error('Stopping stack failed:', error.response?.data || error.message)
    res.status(500).send('Failed to stop stack')
  }
})

app.post('/start', sendPortainerToken, async (req, res) => {
  console.log('Start request body:', req.body)
  try {
    const response = await axios({
      method: 'post',
      url: `${url}/stacks/${req.body.id}/start`,
      params: {
        endpointId: 5,
      },
      headers: {
        Authorization: `Bearer ${req.portainerToken}`,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })

    res.status(200).send('Stack started successfully')
  } catch (error) {
    console.error('Starting stack failed:', error.response?.data || error.message)
    res.status(500).send('Failed to start stack')
  }
})

app.get('/database-projects', async (req, res) => {
  try {
    const [projects] = await db.query(`
      SELECT 
        Stacks.Stack_ID,
        Stacks.Name,
        Stacks.Author,
        Stacks.Date,
        Stacks.Template_ID,
        Stacks.Status,
        Templates.Name AS TemplateName
      FROM Stacks
      JOIN Templates ON Stacks.Template_ID = Templates.Template_ID
    `)

    console.log('Projects from database:', projects)
    res.json(projects)
  } catch (error) {
    console.error('Error fetching projects from database:', error)
    res.status(500).json({
      message: 'Error fetching projects',
      details: error.message,
    })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  console.log(req)
  try {
    const portainerRes = await axios.post(
      'https://portainer.kubelab.dk/api/auth',
      {
        username: 'Xanderco',
        password: 'Bulkmasterbu1u',
      },
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      },
    )

    const portainerToken = portainerRes.data.jwt

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
      req.session.portainerToken = portainerToken

      res.status(200).send('Login successful')
    } else {
      res.status(401).send('Invalid credentials')
    }
  } catch (error) {
    console.error('Login route error:', error)
    res.status(500).send('Server error during login')
  }
})

app.get('/projects', sendPortainerToken, async (req, res) => {
  try {
    const response = await axios.get(`${url}/stacks`, {
      headers: {
        Authorization: `Bearer ${req.portainerToken}`,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })

    // Get the composition string for templates
    const projectsWithTemplates = await Promise.all(
      response.data.map(async (project) => {
        try {
          const compositionResponse = await axios.get(`${url}/stacks/${project.Id}/file`, {
            headers: {
              Authorization: `Bearer ${req.portainerToken}`,
            },
            httpsAgent: new https.Agent({
              rejectUnauthorized: false,
            }),
          })

          // Detect template type
          project.Template = detectTemplateType(compositionResponse.data)
        } catch (error) {
          console.error(`Could not fetch composition for project ${project.Id}:`, error)
          project.Template = 'Unknown'
        }
        return project
      }),
    )

    // Sync projects to database
    const syncResult = await syncProjectsToDatabase(db, projectsWithTemplates)

    // Return the projects and sync result
    res.json({
      projects: projectsWithTemplates,
      syncResult: syncResult,
    })
  } catch (error) {
    console.error('Detailed Error Fetching Stacks:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    })
    res.status(500).json({
      message: 'Error fetching stacks',
      details: error.message,
    })
  }
})

app.get('/projects/:id/composition', sendPortainerToken, async (req, res) => {
  try {
    const response = await axios.get(`${url}/stacks/${req.params.id}/file`, {
      headers: {
        Authorization: `Bearer ${req.portainerToken}`,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })

    // Detect template type
    const templateType = detectTemplateType(response.data)

    res.json({
      compositionFile: response.data,
      templateType: templateType,
    })
  } catch (error) {
    console.error('Error fetching composition file:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })
    res.status(500).json({
      message: 'Error fetching composition file',
      details: error.message,
    })
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err)
      return res.status(500).send('Could not log out')
    }
    res.clearCookie('connect.sid') // Clear the session cookie
    res.status(200).json({ message: 'Logged out successfully!' }) // Inform the frontend
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

app.post('/create-user', (req, res) => {
  console.log('Received request body:', req.body)
  console.log('Request headers:', req.headers)

  bcrypt.hash(req.body.Password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Hashing error:', err)
      return res.status(500).json({ error: 'Password hashing failed' })
    }

    console.log('Hashed Password:', hashedPassword)

    const { Email, Password, isAdmin, Name } = req.body

    const sql = 'INSERT INTO Users (Email, Password, isAdmin, Name) VALUES (?, ?, ?, ?)'
    db.query(sql, [Email, hashedPassword, isAdmin || false, Name], (queryErr, result) => {
      if (queryErr) {
        console.error('Detailed Insertion error:', queryErr)
        return res.status(500).json({
          error: 'User creation failed',
          details: queryErr.message,
          sqlMessage: queryErr.sqlMessage,
        })
      }

      console.log('User creation result:', result)
      res.status(201).json({ success: 'User created', result })
    })
  })
})

app.listen(PORT, () => {
  console.log(`We are listening. ${PORT}`)
  console.log('Database connected:', db !== null)
})

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: 'Unexpected server error',
    details: err.message,
  })
})

export default app
