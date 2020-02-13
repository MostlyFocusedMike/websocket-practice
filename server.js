const express = require('express')
const app = express()

let value = 'initial value';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ws.html');
})

app.get('/test', (req, res) => {
    res.send({ value })
});

app.listen(8765, () => {
    console.log('Example app listening on port 8765!')
});

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 40510});
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`received: ${message}`);
    })
    setInterval(
        () => ws.send(`${new Date()}`),
        10000
    )
});
