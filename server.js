// https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807

const express = require('express')
const app = express()

let logs = ['Start Chatting!'];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ws.html');
})

app.listen(8765, () => {
    console.log('Example app listening on port 8765!')
});

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 40510});

// on connection the websocket connection client is passed in
// you can keep track of clients so send certain messages to certain clients
wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                if (data === 'connected' && ws === client) {
                    console.log('hello there')
                    client.send(JSON.stringify(logs));
                } else if (data !== 'connected') {
                    const messages = JSON.stringify([data]);
                    client.send(messages);
                }
            }

        });
    });
});