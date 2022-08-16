import fs from 'fs'
import os from 'os'

export const configPath = `${os.homedir()}/.personalary`
export const configFilePath = `${configPath}/spotify.json`

const spotifyRemoteConfig = () => {
  if (fs.existsSync(configFilePath)) {
    const configFile = fs.readFileSync(configFilePath)
    const configFileParsed = JSON.parse(configFile.toString())
    return configFileParsed
  }

  return null
}

export default spotifyRemoteConfig
