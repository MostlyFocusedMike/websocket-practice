// https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807

const express = require('express')
const app = express()

let logs = 'Start chatting!';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ws.html');
})

app.listen(8765, () => {
    console.log('Example app listening on port 8765!')
});

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 40510});

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        console.log('data: ', data);
        wss.clients.forEach((client) => {
            if (data !== 'connected' && client.readyState === WebSocket.OPEN) { // this would send it to every client BUT the connection that sent it
                console.log('hinge');
                const messages = JSON.stringify([data]);
                client.send(messages);
            }
        });
    });
});