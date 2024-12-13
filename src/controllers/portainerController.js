import { connection } from '../db/database.js'
const db = await connection().catch((err) => {
  console.error('Database connection failed:', err)
  process.exit(1)
})

export async function syncProjectsToDatabase(db, portainerProjects) {
  try {
    // Start a transaction
    await db.beginTransaction()

    // Convert and format projects
    const formattedProjects = portainerProjects.map((project) => ({
      Name: project.Name,
      Author: project.CreatedBy,
      Status: project.Status,
      Date: new Date(project.CreationDate * 1000).toISOString().slice(0, 19).replace('T', ' '),
      Stack_ID: project.Id,
    }))

    // Identify current Portainer project IDs
    const currentPortainerIds = formattedProjects.map((p) => p.Stack_ID)

    // Remove projects from database that no longer exist in Portainer
    const deleteQuery = 'DELETE FROM Stacks WHERE Stack_ID NOT IN (?)'
    await db.query(deleteQuery, [currentPortainerIds])

    // Upsert projects
    for (const project of formattedProjects) {
      const upsertQuery = `
        INSERT INTO Stacks (Name, Author, Status, Date, Stack_ID) 
        VALUES (?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        Status = VALUES(Status), 
        Date = VALUES(Date)
      `
      await db.query(upsertQuery, [
        project.Name,
        project.Author,
        project.Status,
        project.Date,
        project.Stack_ID,
      ])
    }

    // Commit the transaction
    await db.commit()

    return {
      totalProjects: formattedProjects.length,
      syncedProjects: formattedProjects,
    }
  } catch (error) {
    // Rollback the transaction if anything fails
    await db.rollback()
    console.error('Project synchronization failed:', error)
    throw error
  }
}
