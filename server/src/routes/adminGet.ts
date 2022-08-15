import type { RequestHandler } from 'express'

import loadConfig from '../loadConfig'

const adminGet: RequestHandler = (_req, res) => res.send(loadConfig())

export default adminGet
