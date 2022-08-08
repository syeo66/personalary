import express from 'express'
import path from 'path'
import { merge, Subject, takeUntil } from 'rxjs'
import ws from 'ws'

import loadConfig from './loadConfig'
import providers from './providers'

// Initialize the express engine
const app: express.Application = express()

// Take a port 3000 for running server.
const PORT = Number(process.env.PORT || 8080)

const wsServer = new ws.Server({ noServer: true })
wsServer.on('connection', (socket) => {
  const connectionIsClosed$ = new Subject<boolean>()

  socket.on('message', (message) => {
    // eslint-disable-next-line no-console
    console.log('Received message:', message.toString())
  })

  socket.on('close', () => {
    connectionIsClosed$.next(true)
    connectionIsClosed$.complete()
  })

  const workload$ = merge(...providers)

  workload$.pipe(takeUntil(connectionIsClosed$)).subscribe({
    next: (message) => {
      // eslint-disable-next-line no-console
      console.log('Sending message:', message)
      socket.send(message)
    },
    // eslint-disable-next-line no-console
    error: (error) => console.error(error),
    // eslint-disable-next-line no-console
    complete: () => console.log('---------------------------------------------------'),
  })
})

app.use(express.static(path.join(__dirname, '../public')))

// Handling '/' Request
app.get('/', (_req, res) => {
  res.send('Personalary Background Service')
})

app.get('/admin', (_req, _res) => {
  _res.send(loadConfig())
})

// Server setup
const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on ${PORT}`)
  // eslint-disable-next-line no-console
  console.log('Press Ctrl+C to quit.')
})

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (websocket) => {
    wsServer.emit('connection', websocket, request)
  })
})
