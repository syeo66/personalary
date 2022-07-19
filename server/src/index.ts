import express from 'express'
import path from 'path'
import { merge } from 'rxjs'
import ws from 'ws'

import providers from './providers'

// Initialize the express engine
const app: express.Application = express()

// Take a port 3000 for running server.
const PORT = process.env.PORT || 8080

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true })
wsServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    // eslint-disable-next-line no-console
    console.log(message.toString())
  })

  merge(...providers).subscribe((message) => {
    socket.send(message)
  })
})

app.use(express.static(path.join(__dirname, '../public')))

// Handling '/' Request
app.get('/echo', (_req, _res) => {
  _res.send('TypeScript With Expresss')
})

// Server setup
const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`)
  // eslint-disable-next-line no-console
  console.log('Press Ctrl+C to quit.')
})

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (websocket) => {
    wsServer.emit('connection', websocket, request)
  })
})
