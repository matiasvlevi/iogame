let player;
if (isBrowser) {
  socket.on('newPlayer', (obj) => {
    world.addPlayer(obj);
    Logger.server(`player ${obj.sid} joined the game!`);
  });
  socket.on('removePlayer', (sid) => {
    delete world.players[sid];
    Logger.server(`player ${sid} left the game`);

  })
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
  world.playerJoin();
}
/**
 * p5js Canvas Setup
 */
function draw() {
  background(51);
  world.render();
}