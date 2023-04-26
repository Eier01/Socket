import app from './app'
import {Server as WebsocketServers} from 'socket.io';
import http from 'http'
import sockets from './sockets';
import {PORT} from './config';

import {connectDB} from './db';

connectDB()

const server = http.createServer(app)
const httpServer = server.listen(PORT)
console.log("server corriendo en el puerto", PORT);


const io = new WebsocketServers(httpServer)
sockets(io)


