const express = require('express')
const fs = require('fs')
const Websocket = require('ws')

const app = express()
const server = new Websocket.Server({ port: 8080 })

server.on('connection', ws => {
    ws.on('message', message =>{
        server.clients.forEach(client => {
            console.log(client)
            if(client.readyState === Websocket.OPEN){
                client.send(message.toString())
            }
        })
    })
    ws.send('Привет!')
    
})

app.use(express.static('../'))

app.get('/', (req, res) => {
    res.sendFile('../index.html')
})

app.listen(3000, () => console.log('Server started, port 3000 ...'))