// import express from 'express'
// import bcrypt from 'bcrypt'
// import { connection } from '../db/database.js'

// const db = await connection()
// const router = express.Router()

// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10)
//     const query = 'Insert INTO Users (Name, Email, Password) VALUES (?, ?, ?)'
//     db.query(query, [name, email, hashedPassword], (err, result) => {
//       if (err) throw err
//       res.status(201).send('User Registered')
//     })
//   } catch (error) {
//     res.status(500).send('Error registering user')
//   }
// })

// router.post('/login', (req, res) => {
//   const query = 'SELECT * FROM Users WHERE Email = ?'
//   db.query(query, [email], async (err, results) => {
//     if (err) throw err
//     if (results.length > 0) {
//       const user = results[0]

//       const isMatch = await bcrypt.compare(password, user.password)

//       if (isMatch) {
//         res.status(200).send('Login successful')
//       } else {
//         res.status(401).send('Invalid credentials')
//       }
//     } else {
//       res.status(404).send('User not found')
//     }
//   })
// })

// export default router

