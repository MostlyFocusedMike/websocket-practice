// https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ws.html');
})

app.listen(8765, () => {
    console.log('Example app listening on port 8765!')
});

const WebSocket = require('ws');

const socketServer = new WebSocket.Server({ port: 40510});
let logs = ['Start Chatting!'];

const isConnecting = (data) => data === 'connected';

// on connection the websocket connection client is passed in
// you can keep track of clients so send certain messages to certain clients
socketServer.on('connection', (ws) => {
    ws.on('message', (data) => {
        if (!isConnecting(data)) logs.push(data);

        socketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                if (isConnecting(data) && ws === client) {
                    client.send(JSON.stringify(logs));
                } else if (!isConnecting(data)) {
                    const messages = JSON.stringify([data]);
                    client.send(messages);
                }
            }

        });
    });
});