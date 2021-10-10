/**
 * @class Logger
 */
class Logger {}

/**
 * Similaire a console.log, cette fonction permet de "log" un message a la console.
 * Cette fonction est utilisée pour les logs du client, provenant du serveur.
 * @method server
 * @param {String} msg Le message a ajouter a la console
 */
Logger.server = function(msg) {
  console.log(`[Server]: ${msg}`);
}
// Detect if the code is running in a browser or nodejs.
globalThis.isBrowser = typeof process !== 'object';
if (!isBrowser) {
  globalThis.Player = require('../player/player.js');
}

/**
 * @class World
 */
class World {
  constructor() {
    this.players = {};
    this.tick = 0;
    this.skins = {
      default: [255, 255, 255]
    };
  }
  playerJoin(name = 'username') {
    socket.emit('playerJoin', name);
  }
  addPlayer(name, sid) {
    if (typeof name === 'string') {
      let player = new Player(name, sid);
      player.setPos(Math.random() * 500, Math.random() * 500)
      this.players[sid] = player;
      return player;
    } else if (typeof name === 'object') {
      let player = new Player();
      player = World.fromObject(player, name);
      this.players[name.sid] = player;
      return player;
    }
  }
  removePlayer(sid) {
    delete this.players[sid];
  }
  static fromObject(player, obj) {
    let keys = Object.keys(player);
    let values = Object.values(obj);
    for (let i = 0; i < keys.length; i++) {
      player[keys[i]] = values[i];
    }
    return player;
  }
  toObject() {
    let keys = Object.keys(this);
    let values = Object.values(this);
    let obj = {};
    for (let i = 0; i < keys.length; i++) {
      obj[keys[i]] = values[i];
    }
    return obj;
  }
  render(clientPlayer) {
    let values = Object.values(this.players);
    for (let i = 0; i < values.length; i++) {
      values[i].render(clientPlayer.sid);
    }
  }
}

if (!isBrowser) {
  module.exports = new World();
}
// Detect if the code is running in a browser or nodejs.
globalThis.isBrowser = typeof process !== 'object';
let world;
if (!isBrowser) {
  world = require('../env/world.js');
} else if (world === undefined) {
  world = new World();
}

class Player {
  constructor(name, sid, x = 0, y = 0) {
    this.pos = {
      x,
      y
    }
    this.vel = {
      x: 0,
      y: 0
    }
    this.size = 16;
    this.self = false;
    this.username = name;
    this.sid = sid;
    this.skin = 'default';
  }
  toObject() {
    let keys = Object.keys(this);
    let values = Object.values(this);
    let obj = {};
    for (let i = 0; i < keys.length; i++) {
      obj[keys[i]] = values[i];
    }
    return obj;
  }
  setPos(x, y) {
    this.pos = {
      x,
      y
    }
  }
  render(sid) {

    if (this.sid === sid) {
      fill(100, 100, 100, 100);
      ellipse(this.pos.x, this.pos.y, 64, 64);
    }

    // Color
    noStroke();
    fill.apply(1, world.skins[this.skin])

    // Shape
    ellipse(this.pos.x, this.pos.y, this.size, this.size);


    text(this.username, this.pos.x + this.size, this.pos.y + this.size);
  }
}

// Export is in node environement
if (!isBrowser) {
  module.exports = Player;
}
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