const http = require('node:http')
const express = require('express')

const cors = require('cors')

const app = express()

const server = http.createServer(app)
const { Server } = require('socket.io')

app.use(cors())

app.get('/', (req, res) => {
  res.send('hello word')
})
const map = new Map()

const io = new Server(server, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  console.log('a user connected')
  map.set(socket, 0)

  // socket.broadcast.emit('hi', 'user')
  io.emit('welcome', map.size)

  socket.on('chat-message', (data, callback) => {
    console.log(`on chat message: ${data}`)
    callback({
      status: 'ok',
      code: 'xxx',
    })
    // socket.emit('server-res', `res: ${ data}`, Uint8Array.from([42, 64, 333, 444]), Uint8Array.from([12]))
    // io.emit('server-res', `all: ${data}`)
  })

  socket.on('disconnect', () => {
    map.delete(socket)
    console.log('user disconnected', map.size)
    io.emit('welcome', map.size)
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
