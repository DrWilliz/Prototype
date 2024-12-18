import { connection } from '../db/database.js'
import yaml from 'js-yaml'
const db = await connection().catch((err) => {
  console.error('Database connection failed:', err)
  process.exit(1)
})

export function detectTemplateType(stackFileContent) {
  // If the input is an object with StackFileContent, extract it
  if (typeof stackFileContent === 'object' && stackFileContent.StackFileContent) {
    stackFileContent = stackFileContent.StackFileContent
  }

  // Try parsing as JSON first
  let parsedFile
  try {
    parsedFile =
      typeof stackFileContent === 'string' ? JSON.parse(stackFileContent) : stackFileContent
  } catch {
    // If not JSON, try YAML
    try {
      parsedFile = yaml.load(stackFileContent)
    } catch {
      return null
    }
  }

  // Extract services
  const services = parsedFile.services || parsedFile.Services || {}

  // Detect template based on services
  const serviceImages = Object.values(services).map((service) => service.image?.toLowerCase() || '')

  // Template detection
  if (serviceImages.some((img) => img.includes('wordpress'))) {
    return 2
  } else if (serviceImages.some((img) => img.includes('nginx'))) {
    return 1
  } else if (serviceImages.some((img) => img.includes('mysql') || img.includes('mariadb'))) {
    return 3
  } else if (serviceImages.some((img) => img.includes('phpmyadmin'))) {
    return 4
  } else if (serviceImages.length > 0) {
    // If images exist but no specific match
    return 5 //Custom Docker Composition (3-5 have not been added, just for future)
  }

  return null
}

export async function syncProjectsToDatabase(db, portainerProjects) {
  try {
    await db.beginTransaction()

    // Convert and format projects
    const formattedProjects = portainerProjects.map((project) => ({
      Name: project.Name,
      Author: project.CreatedBy,
      Status: project.Status,
      Date: new Date(project.CreationDate * 1000 - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0],
      Stack_ID: project.Id,
      Template_ID: project.Template || null,
    }))

    // Identify current Portainer project IDs
    const currentPortainerIds = formattedProjects.map((p) => p.Stack_ID)

    // Remove projects from database that no longer exist in Portainer
    const deleteQuery = 'DELETE FROM Stacks WHERE Stack_ID NOT IN (?)'
    await db.query(deleteQuery, [currentPortainerIds])

    // Upsert (update +/- insert) projects
    for (const project of formattedProjects) {
      const upsertQuery = `
        INSERT INTO Stacks (Name, Author, Status, Date, Stack_ID, Template_ID) 
        VALUES (?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        Status = VALUES(Status), 
        Date = VALUES(Date),
        Template_ID = VALUES(Template_ID)
      `
      await db.query(upsertQuery, [
        project.Name,
        project.Author,
        project.Status,
        project.Date,
        project.Stack_ID,
        project.Template_ID,
      ])
    }

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
