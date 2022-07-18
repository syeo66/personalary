import express from 'express'
import path from 'path'

// Initialize the express engine
const app: express.Application = express()

// Take a port 3000 for running server.
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, '../public')))

// Handling '/' Request
app.get('/echo', (_req, _res) => {
  _res.send('TypeScript With Expresss')
})

// Server setup
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`)
  // eslint-disable-next-line no-console
  console.log('Press Ctrl+C to quit.')
})
