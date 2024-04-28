import type { RequestHandler } from 'express'

import connectDb from '../db'
import { Screen, screenSchema } from '../model'

export const screenList: RequestHandler = async (_req, res) => {
  const db = await connectDb()
  const result = await db.all<Screen[]>('SELECT * FROM Screen')
  return res.send({ items: result })
}

// ----------------------------------------------------------------------------

export const screenGet: RequestHandler = async (req, res) => {
  const { id } = req.params
  const db = await connectDb()
  const result = await db.get<Screen>('SELECT * FROM Screen WHERE id = ?', [id])
  return res.send(result)
}

// ----------------------------------------------------------------------------

const updateScreenSchema = screenSchema.omit({ id: true })

export const screenCreate: RequestHandler = async (req, res) => {
  const screen = updateScreenSchema.safeParse(req.body)

  if (screen.error) {
    return res.status(400).send(screen.error)
  }

  const { name, type } = screen.data
  const db = await connectDb()
  const result = await db.run('INSERT INTO Screen (name, type) VALUES (?, ?)', [name, type])
  return res.status(201).send({ id: result.lastID, name, type })
}

// ----------------------------------------------------------------------------

export const screenUpdate: RequestHandler = async (req, res) => {
  const { id } = req.params

  const screen = updateScreenSchema.safeParse(req.body)

  if (screen.error) {
    return res.status(400).send(screen.error)
  }

  const { name, type } = screen.data
  const db = await connectDb()
  const { changes } = await db.run('UPDATE Screen SET name = ?, type = ? WHERE id = ?', [name, type, id])
  if (!changes) {
    return res.status(404).send({ error: 'Screen not found' })
  }

  return res.send({ id, name, type })
}

// ----------------------------------------------------------------------------

export const screenDelete: RequestHandler = async (req, res) => {
  const { id } = req.params
  const db = await connectDb()
  await db.run('DELETE FROM Screen WHERE id = ?', [id])
  return res.send({ status: 'OK' })
}
