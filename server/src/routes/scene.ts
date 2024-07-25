import type { RequestHandler } from 'express'
import { z } from 'zod'

import connectDb from '../db'
import { Scene } from '../model'

export const sceneList: RequestHandler = async (_req, res) => {
  const db = await connectDb()
  const result = await db.all<Scene[]>('SELECT * FROM Scene')
  return res.send({ items: result })
}

// ----------------------------------------------------------------------------

export const sceneGet: RequestHandler = async (req, res) => {
  const { id } = req.params
  const db = await connectDb()
  const result = await db.get<Scene>('SELECT * FROM Scene WHERE id = ?', [id])
  if (!result) {
    return res.status(404).send({ message: 'Scene not found' })
  }
  return res.send(result)
}

// ----------------------------------------------------------------------------

const updateSceneSchema = z.object({
  name: z.string(),

  triggerType: z.enum(['time', 'datetime']).default('time'),
  triggerData: z.string().default(''),

  active: z.boolean().default(true),
})

export const sceneCreate: RequestHandler = async (req, res) => {
  const scene = updateSceneSchema.safeParse(req.body)

  if (scene.error) {
    return res.status(400).send(scene.error)
  }

  const { name, triggerType, triggerData, active } = scene.data
  const db = await connectDb()
  const result = await db.run('INSERT INTO Scene (name, triggerType, triggerData, active) VALUES (?, ?, ?, ?)', [
    name,
    triggerType,
    triggerData,
    active,
  ])

  if (!result.lastID) {
    return res.status(500).send({ error: 'Could not create scene' })
  }

  return res.status(201).send({ id: result.lastID, name, triggerType, active, triggerData } satisfies Scene)
}

// ----------------------------------------------------------------------------

export const sceneUpdate: RequestHandler = async (req, res) => {
  const { id } = req.params

  const scene = updateSceneSchema.safeParse(req.body)

  if (scene.error) {
    return res.status(400).send(scene.error)
  }

  const { name, triggerType, triggerData, active } = scene.data
  const db = await connectDb()
  const { changes } = await db.run(
    'UPDATE Scene SET name = ?, triggerType = ?, triggerData = ?, active = ? WHERE id = ?',
    [name, triggerType, triggerData, active, id]
  )
  if (!changes) {
    return res.status(404).send({ error: 'Scene not found' })
  }

  return res.send({ id: Number(id), name, triggerType, triggerData, active } satisfies Scene)
}

// ----------------------------------------------------------------------------

export const sceneDelete: RequestHandler = async (req, res) => {
  const { id } = req.params
  const db = await connectDb()
  await db.run('DELETE FROM Scene WHERE id = ?', [id])
  return res.send({ status: 'OK' })
}
