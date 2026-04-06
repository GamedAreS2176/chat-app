import express from 'express';
import { Server } from "socket.io";
import { createServer } from 'node:http';
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const app = express();
const server = createServer(app);
const __dirname = dirname(fileURLToPath(import.meta.url));
const io = new Server(server);
const PORT = Number(process.env.PORT) || 3000;
app.get('/', (req, res) => {
    res.sendFile(join(process.cwd(), 'index.html'));
});
io.on('connection', (socket) => {
    console.log("user connected");
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(PORT, () => {
    console.log('server running on: ' + PORT);
});
