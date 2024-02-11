## WebSocket
Protocol that allows bidirectional communication between a client and a server in real time, especially useful for applications that require constant updates such as: chat, feeds, notifications and multiplayer games. Example using NodeJS on the server and the web browser API on the client:
```js
// Server
import { WebSocketServer } from 'ws'

const server = new WebSocketServer({ port: 3000 })

server.on('connection', socket => {
  console.log('Client connected\n')
  socket.on('message', message => {
    console.log(`Message received:\n${message}\n`)
    socket.send('Message received at server')
  })
  socket.on('close', () => {
    console.log('Client disconnected\n')
  })
})
```
```js
// Client
const socket = new WebSocket('ws://localhost:3000')

socket.addEventListener('open', event => {
  console.log('Connected to server\n')
  socket.send('Hello, World!')
})

socket.addEventListener('message', event => {
  console.log(`Message received:\n${event.data}\n`)
})

socket.addEventListener('close', event => {
  console.log('Server disconnected\n')
})
```