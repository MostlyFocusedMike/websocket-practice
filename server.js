// https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807

const express = require('express');
const path = require('path');
const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8765, () => {
    console.log('Example app listening on port 8765!')
});

const WebSocket = require('ws');

const socketServer = new WebSocket.Server({ port: 40510});
let logs = ['Start Chatting!'];

// on connection the websocket connection client is passed in
// you can keep track of clients so send certain messages to certain clients
socketServer.on('connection', (ws) => {
    console.log('connection!');
    ws.send(JSON.stringify(logs));
    ws.on('message', (data) => {
        logs.push(data);
        socketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                const messages = JSON.stringify([data]);
                client.send(messages);
            }
        });
    });
});