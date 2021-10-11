let player;
// Socket.io Events
if (isBrowser) {
  socket.on('newPlayer', (obj) => {
    world.addPlayer(obj);
    Logger.server(`${obj.username} joined the game!`);
  });
  socket.on('removePlayer', (sid) => {
    let name = world.players[sid].username;
    delete world.players[sid];
    Logger.server(`player ${name} left the game`);
  });
  socket.on('selfPlayer', (obj) => {
    player = World.fromObject(new Player(), obj);
    world.players[obj.sid].self = true;
  });
  socket.on('updatePosClient', (data) => {
    world.players[data.sid].pos = data.pos;
    world.players[data.sid].vel = data.vel;
  })
}