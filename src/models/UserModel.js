import { connection } from '../db/database.js'

const db = await connection()

export const getUsers = async () => {
  const [rows] = await db.query('SELECT * FROM `Users`')
  return rows
}

export const getUserById = async (User_ID) => {
  const [rows] = await db.query('SELECT * FROM `Users` WHERE User_ID = ?', [User_ID])
  return rows[0]
}
