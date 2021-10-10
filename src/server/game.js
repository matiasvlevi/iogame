// Game environement
const world = require('../../src/game/env/world.js');
const Player = require('../../src/game/player/player.js');
console.log(world);

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
let d = __dirname.split('\\');
let hostDir = 'public';
let path = d
  .splice(0, d.length - 2)
  .join('\\') + "\\" + hostDir;

// Host directory
app.use(express.static(path));
let socket_id;


function clientsInRoom(namespace, room) {
  var clients = io.nsps[namespace].adapter.rooms[room];
  return Object.keys(clients).length;
}

// Socket server
io.on('connection', socket => {

  let room = 'Room1';
  socket.join(room);


  let sids = socket.to('Room1').adapter.sids.keys()


  // console.log(' \n\n Connected Players: \n');
  // let i = 1;
  // for (let sid of sids) {
  //   console.log(i + '. ' + sid);
  //   i++
  // }


  socket_id = socket.id;


  socket.on('playerJoin', (id) => {
    let player = world.addPlayer(id, socket.id, room);

    // Player join message
    console.log(` > Player sid: ${socket.id}, id: ${id} joined the server !`);

    // Sync with client
    console.log(player);

    socket.to("Room1").emit('newPlayer', player.toObject());
    if (Object.keys(world.players) !== 0) {
      let players_ = Object.values(world.players);
      for (let i = 0; i < players_.length; i++) {
        socket.emit('newPlayer', players_[i].toObject());
      }
    }

  });
  socket.on("disconnecting", (reason) => {

    let sids = socket.adapter.sids.keys();
    console.log(socket.id)
    console.log(sids)
    for (sid of sids) {
      if (sid === socket.id) {
        socket.to("Room1").emit('removePlayer', sid);
        delete world.players[socket.id];
        console.log(` > ${socket.id} User has left`);

      }
    }

  });

})

server.listen(port, () => {
  console.log(`listening on ${port}`);
});