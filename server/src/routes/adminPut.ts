import type { RequestHandler } from 'express'
import fs from 'fs'
import { mergeDeepLeft, pipe } from 'ramda'

import loadConfig, { CONFIG_DIR, USER_CONFIG_PATH } from '../loadConfig'

const adminPut: RequestHandler = (req, res) => {
  let userConfig = {}

  if (fs.existsSync(USER_CONFIG_PATH)) {
    const userConfigString = fs.readFileSync(USER_CONFIG_PATH, 'utf8')
    try {
      userConfig = JSON.parse(userConfigString)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Could not parse user config file at ${USER_CONFIG_PATH}`)
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  const merged = pipe(mergeDeepLeft(req.body))(userConfig)

  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR)
  }
  fs.writeFileSync(USER_CONFIG_PATH, JSON.stringify({ ...merged }, null, '  '))

  res.json({ status: 'OK' })

  const config = loadConfig()
  return res.send(config)
}

export default adminPut
