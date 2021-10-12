// Game environement
const world = require('../../src/game/env/world.js');
const makePath = require('./lib/makePath.js');
const Logger = require('../../src/game/web/logger.js');

// Http server
const express = require('express');
const app = express();

// Socket.io server
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Host port
const port = 3000;

// Parse ./public path
let path = makePath('public');

// Host directory
app.use(express.static(path));

// Socket server
io.on('connection', socket => {

  // Join a room
  let room = 'Room1';
  socket.join(room);

  // On player join
  socket.on('playerJoin', (name) => {

    // Add player to server's world
    let player = world.addPlayer(name, socket.id);

    // Player join message
    Logger.game(`\x1b[32m${name}\x1b[0m joined the server!`, world);

    // Add all players to client's world
    socket.to(room).emit('newPlayer', player.toObject());


    playersList = Object.values(world.players);
    if (playersList.length !== 0) {
      for (let i = 0; i < playersList.length; i++) {
        socket.emit('newPlayer', playersList[i].toObject());
      }
    }
    socket.emit('selfPlayer', player);
  });
  socket.on('updatePos', (data) => {
    world.players[data.sid].pos = data.pos;
    world.players[data.sid].vel = data.vel;
    socket.to(room).emit('updatePosClient', data);
  })
  socket.on('disconnecting', (reason) => {
    // get all connected socket IDs
    let sids = socket.adapter.sids.keys();
    for (sid of sids) {
      // Remove if same ID
      if (sid === socket.id) {
        // Remove player from server's world
        let name = 'unknown';
        if (Object.values(world.players).length > 0) {
          name = world.players[socket.id].username;
          delete world.players[socket.id];
        }

        // Remove player from client's world
        socket.to(room).emit('removePlayer', sid);

        Logger.game(`\x1b[32m${name}\x1b[0m left the server.`, world);
      }
    }
  });
});

// Listen
server.listen(port, () => {
  console.log(`Game Server on http://localhost:${port}\n`);
});