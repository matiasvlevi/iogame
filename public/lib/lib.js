class Logger {}

Logger.server = function(msg) {
  console.log(`[Server]: ${msg}`);
}
/**
 * Multiply two numbers.
 * @method myfunc
 * @param a first factor
 * @param b second factor
 * 
 */
function myfunc(a, b) {
  return a * b;
}
/**
 * Multiply two numbers and add a bias.
 * @method myfunc2
 * @param a first factor
 * @param b second factor
 * @param c translate
 * 
 */
function myfunc2(a, b, c) {
  return a * b + c;
}
// Detect if the code is running in a browser or nodejs.
globalThis.isBrowser = typeof process !== 'object';
if (!isBrowser) {
  globalThis.Player = require('../player/player.js');
}

class World {
  constructor() {
    this.players = {};
    this.tick = 0;
    this.skins = {
      default: [255, 255, 255]
    };
  }
  playerJoin() {
    let id = World.makeID();
    socket.emit('playerJoin', id);
  }
  addPlayer(id, sid) {
    if (typeof id === 'string') {
      let player = new Player(id, sid);
      player.setPos(Math.random() * 500, Math.random() * 500)
      this.players[sid] = player;
      return player;
    } else if (typeof id === 'object') {
      let player = new Player();
      let keys = Object.keys(player);
      let values = Object.values(id);
      for (let i = 0; i < keys.length; i++) {
        player[keys[i]] = values[i]
      }
      this.players[id.sid] = player;
      return player;
    }
  }
  removePlayer(sid) {
    delete this.players[sid];
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
  render() {
    let values = Object.values(this.players);
    for (let i = 0; i < values.length; i++) {
      values[i].render();
    }
  }
}

// Static
World.chars = () => {
  // alphabet
  for (i = 97, a = ''; i < 123;) a += String.fromCharCode(i++);
  // numbers
  for (i = 48, b = ''; i < 58;) b += String.fromCharCode(i++);
  return a + a.toLocaleUpperCase() + b;
}
World.makeID = () => {
  let id = '';
  let chars = World.chars();
  for (let i = 0; i < 12; i++) {
    let n = Math.floor(Math.random() * (chars.length - 1));
    id += chars[n];
  }
  return id;
};


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
  constructor(id, sid, x = 0, y = 0) {
    this.pos = {
      x,
      y
    }
    this.vel = {
      x: 0,
      y: 0
    }
    this.id = id;
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
  render() {

    // Color
    noStroke();
    fill.apply(1, world.skins[this.skin])

    // Shape
    ellipse(this.pos.x, this.pos.y, 16, 16);
  }
}



if (!isBrowser) {
  module.exports = Player;
}
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