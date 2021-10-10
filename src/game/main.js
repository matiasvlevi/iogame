let player;
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
  });
}


/**
 * p5js Canvas Setup
 */
let wnx = window.innerWidth;
let wny = window.innerHeight;

function setup() {
  wnx = window.innerWidth;
  wny = window.innerHeight;
  createCanvas(wnx, wny);
  world.playerJoin(prompt('Nickname:'));
}
/**
 * p5js Canvas Setup
 */
function draw() {
  background(51);
  world.render(player);
}