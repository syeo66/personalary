import os from 'os'
import path from 'path'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

sqlite3.verbose()

export const DB_PATH = process.env.DB_PATH || `${os.homedir()}/.personalary/database.db`

const connectDb = async () =>
  await open({
    filename: DB_PATH,
    driver: sqlite3.cached.Database,
  })

;(async () => {
  // open the database
  const db = await connectDb()

  console.log('Connected to database', DB_PATH)
  console.log(path.join(process.cwd(), 'migrations'))

  await db.migrate()
})()

export default connectDb
