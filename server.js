// https://blog.bitlabstudio.com/a-simple-chat-app-with-react-node-and-websocket-35d3c9835807
const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

const port = 8765
app.listen(port, () => {
    console.log(`listening http://localhost:${port}`)
});

const socketServer = new WebSocket.Server({port: 3030});

const messages = ['Start Chatting!'];

// on connection the websocket connection client is passed in
// you can keep track of clients so send certain messages to certain clients
socketServer.on('connection', (socketClient) => {
    console.log('connected');
    console.log('Number of clients: ', socketServer.clients.size);
    socketClient.send(JSON.stringify(messages));
    socketClient.on('message', (data) => {
        messages.push(data);
        socketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                const messages = JSON.stringify([data]);
                client.send(messages);
            }
        });
    });

    socketClient.on('close', (socketClient) => {
        console.log('closed');
        console.log('Number of clients: ', socketServer.clients.size);
    });
});

