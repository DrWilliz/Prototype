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

export const deleteUserById = async (User_ID) => {
await db.query('DELETE FROM `Users` WHERE User_ID = ?', [User_ID])
}

export const getUserEmail = async () => {
  const [rows] = await db.query('SELECT Email FROM `Users`')
  return rows
}

export const getUsername = async () => {
  const [rows] = await db.query('SELECT Name FROM `Users`')
  return rows
}

export const getUserPW = async () => {
  const [rows] = await db.query('SELECT Password FROM `Users`')
  return rows
}
