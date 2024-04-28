import type { RequestHandler } from 'express'

import connectDb from '../db'
import { Screen, screenSchema } from '../model'

export const screenList: RequestHandler = async (_req, res) => {
  const db = await connectDb()
  const result = await db.all<Screen[]>('SELECT * FROM Screen')
  return res.send({ items: result })
}

// ----------------------------------------------------------------------------

const createScreenSchema = screenSchema.omit({ id: true })

export const screenCreate: RequestHandler = async (req, res) => {
  const screen = createScreenSchema.safeParse(req.body)

  if (screen.error) {
    return res.status(400).send(screen.error)
  }

  const { name, type } = screen.data
  const db = await connectDb()
  const result = await db.run('INSERT INTO Screen (name, type) VALUES (?, ?)', [name, type])
  return res.send({ id: result.lastID, name, type })
}

// ----------------------------------------------------------------------------

export const screenDelete: RequestHandler = async (req, res) => {
  const { id } = req.params
  console.log(id)
  const db = await connectDb()
  await db.run('DELETE FROM Screen WHERE id = ?', [id])
  return res.send({ status: 'OK' })
}
