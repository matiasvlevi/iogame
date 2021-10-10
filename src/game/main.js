let player;
// Socket.io Events
if (isBrowser) {
  socket.on('newPlayer', (obj) => {
    world.addPlayer(obj);
    Logger.server(`${obj.username} joined the game!`);
  });
  socket.on('removePlayer', (sid) => {
    delete world.players[sid];
    Logger.server(`player ${sid} left the game`);
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


/**
 * p5js Canvas Setup
 */

function setup() {
  let wnx = window.innerWidth;
  let wny = window.innerHeight;
  createCanvas(wnx, wny);
  world.playerJoin(prompt('Nickname:'));
  world.setSize(wnx, wny);
}
/**
 * p5js Canvas Setup
 */
function draw() {
  background(51);
  world.render(player);
  world.update();
}