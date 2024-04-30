import type { RequestHandler } from 'express'

import connectDb from '../db'
import { Scene, sceneSchema } from '../model'

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

const updateSceneSchema = sceneSchema.omit({ id: true })

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
  return res.status(201).send({ id: result.lastID, name, triggerType, active })
}

// ----------------------------------------------------------------------------

export const sceneUpdate: RequestHandler = async (req, res) => {
  const { id } = req.params

  const scene = updateSceneSchema.safeParse(req.body)

  if (scene.error) {
    return res.status(400).send(scene.error)
  }

  const { name, triggerType, active } = scene.data
  const db = await connectDb()
  const { changes } = await db.run('UPDATE Scene SET name = ?, triggerType = ?, active = ? WHERE id = ?', [
    name,
    triggerType,
    active,
    id,
  ])
  if (!changes) {
    return res.status(404).send({ error: 'Scene not found' })
  }

  return res.send({ id, name, triggerType, active })
}

// ----------------------------------------------------------------------------

export const sceneDelete: RequestHandler = async (req, res) => {
  const { id } = req.params
  const db = await connectDb()
  await db.run('DELETE FROM Scene WHERE id = ?', [id])
  return res.send({ status: 'OK' })
}
