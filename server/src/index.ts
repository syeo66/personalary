import cors from 'cors'
import express from 'express'
import path from 'path'
import { merge, Subject, takeUntil } from 'rxjs'
import ws from 'ws'

import providers from './providers'
import adminGet from './routes/adminGet'
import adminPut from './routes/adminPut'
import adminSpotifyAuth from './routes/adminSpotifyAuth'
import adminSpotifyRemoveAuth from './routes/adminSpotifyRemoveAuth'
import { screenList } from './routes/screen'

// Initialize the express engine
const app: express.Application = express()

// Take a port 3000 for running server.
const PORT = Number(process.env.PORT || 8080)

const wsServer = new ws.Server({ noServer: true })
wsServer.on('connection', (socket) => {
  const connectionIsClosed$ = new Subject<boolean>()

  socket.on('message', (message) => {
    console.log('Received message:', message.toString())
  })

  socket.on('close', () => {
    connectionIsClosed$.next(true)
    connectionIsClosed$.complete()
  })

  const workload$ = merge(...providers)

  workload$.pipe(takeUntil(connectionIsClosed$)).subscribe({
    next: (message) => {
      console.log('Sending message:', message)
      socket.send(message)
    },
    error: (error) => console.error(error),
    complete: () => console.log('---------------------------------------------------'),
  })
})

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(cors())

app.get('/api/admin', adminGet)
app.get('/api/admin/spotify/auth', adminSpotifyAuth)
app.get('/api/admin/spotify/removeAuth', adminSpotifyRemoveAuth)
app.put('/api/admin', adminPut)

app.get('/api/admin/screen', screenList)

/* final catch-all route to index.html defined last */
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Handling '/' Request
app.get('/', (_req, res) => {
  res.send('Personalary Background Service')
})

// Server setup
const server = app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (websocket) => {
    wsServer.emit('connection', websocket, request)
  })
})
