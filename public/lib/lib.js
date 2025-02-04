/**
 * @class Logger
 * @constructor
 */
class Logger {
  constructor() {
    // Y u making instance? ;(
  }
}

/**
 * @method server
 * @static
 * @param {String} msg Le message a ajouter a la console
 * Similaire a console.log, cette fonction permet de "log" un message a la console.
 * Cette fonction est utilisée pour les logs du client, provenant du serveur.
 */
Logger.server = function(msg) {
  console.log(`[Server]: ${msg}`);
}

/**
 * @method game
 * @static
 * @param {String} msg message to log in the server console
 * @param {String} world current world object.
 * Similaire a console.log, cette fonction permet de "log" un message a la console.
 * Cette fonction est utilisée pour les logs du serveur, avec des informations provenant du client.
 */
Logger.game = function(msg, world) {
  let n = Object.values(world.players).length;
  let t = 20;
  let date = new Date().toLocaleTimeString().slice(0, 5);
  let head = `[\x1b[33m${date}\x1b[0m]` + `[\x1b[33m${n}\x1b[0m/\x1b[33m${t}\x1b[0m] > `;
  let str = head + msg;
  console.log(str);
  return str;
}

// Exports

// Detect if the code is running in a browser or nodejs.
globalThis.isBrowser = typeof process !== 'object';
if (!isBrowser) {
  module.exports = Logger;
}
// Detect if the code is running in a browser or nodejs.
globalThis.isBrowser = typeof process !== 'object';
if (!isBrowser) {
  globalThis.Player = require('../player/player.js');
}

/**
 * @class World
 * @constructor
 */
const World = function constructor() {
  this.players = {};
  this.tick = 0;
  this.wn = {
    x: 800,
    y: 800
  }
  this.skins = {
    default: [255, 255, 255]
  };
}


/**
 * @method setSize
 * @param {Number} x 
 * @param {Number} y 
 * Changer la grandeur de l'écran
 */
World.prototype.setSize = function(x, y) {
  this.wn = {
    x,
    y
  }
}

/**
 * @method playerJoin
 * @param {String} name nom d'utilisateur
 * Demander au serveur de rejoindre avec un certain nom d'utilisateur.
 */
World.prototype.playerJoin = function(name = 'username') {
  socket.emit('playerJoin', name);
}

/**
 * @method addPlayer
 * @param {String} name 
 * @param {String} sid 
 * @return {Player}
 * Ajouter un autre joueur dans le monde local.
 */
World.prototype.addPlayer = function(name, sid) {
  if (typeof name === 'string') {
    let player = new Player(name, sid);
    player.setPos(Math.random() * this.wn.x, Math.random() * this.wn.y)
    this.players[sid] = player;
    return player;
  } else if (typeof name === 'object') {
    let player = new Player();
    player = World.fromObject(player, name);
    this.players[name.sid] = player;
    return player;
  }
}

/**
 * @method removePlayer
 * @param {String} sid 
 * Supprimer un jouer du monde local.
 */
World.prototype.removePlayer = function(sid) {
  delete this.players[sid];
}

/**
 * @method fromObject
 * @static
 * @param {Player} player 
 * @param {Object} obj 
 * @return {Player}
 */
World.fromObject = function(player, obj) {
  let keys = Object.keys(player);
  let values = Object.values(obj);
  for (let i = 0; i < keys.length; i++) {
    player[keys[i]] = values[i];
  }
  return player;
}

/**
 * @method render
 * @param {Player} clientPlayer 
 * Dessiner tous les joueurs a l'écran.
 */
World.prototype.render = function(clientPlayer) {
  let values = Object.values(this.players);
  for (let i = 0; i < values.length; i++) {
    values[i].render(clientPlayer.sid);
  }
}

/**
 * Converti une instance de World en objet simple
 * @method toObject
 */
World.prototype.toObject = function toObject() {
  let keys = Object.keys(this);
  let values = Object.values(this);
  let obj = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj;
}

/**
 * Update call
 * @method update
 */
World.prototype.update = function update() {
  for (let player in world.players) {
    world.players[player].update();
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

/**
 * @class Player
 * @constructor
 */
const Player = function constructor(name, sid, x = 0, y = 0) {
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
  this.speed = 1.5;
}


/**
 * @method setPos
 * @param {Number} x 
 * @param {Number} y 
 * Definir la position du joueur.
 */
Player.prototype.setPos = function(x, y) {
  this.pos = {
    x,
    y
  }
}

/**
 * @method render
 * @param {String} sid Socket id du joueur
 * Dessine un joueur a l'écran.
 */
Player.prototype.render = function(sid) {

  // is main player:
  if (this.sid === sid) {
    fill(100, 100, 100, 100);
    ellipse(this.pos.x, this.pos.y, 64, 64);
  }

  noStroke();
  fill.apply(1, world.skins[this.skin])

  ellipse(this.pos.x, this.pos.y, this.size, this.size);
  text(this.username, this.pos.x + this.size, this.pos.y + this.size);
}

/**
 * @method update
 * Met a jour la position du joueur
 */
Player.prototype.update = function() {
  //Keyboard
  //up & down
  if (this.self) {
    if (keyIsDown(UP_ARROW)) {
      this.addForce(0, -1);
    } else if (keyIsDown(DOWN_ARROW)) {
      this.addForce(0, 1);
    }
    // left & right
    if (keyIsDown(LEFT_ARROW)) {
      this.addForce(-1, 0);
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.addForce(1, 0);
    }
  }
  // Physics
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
  this.vel.x *= 0.9;
  this.vel.y *= 0.9;
};

/**
 * @method addForce
 * @param {Number} x 
 * @param {Number} y 
 * Ajouter une force (ou acceleration) sur un joueur et envoyer l'information au serveur.
 */
Player.prototype.addForce = function(x, y) {
  this.vel.x += x * this.speed;
  this.vel.y += y * this.speed;

  socket.emit('updatePos', {
    sid: this.sid,
    pos: this.pos,
    vel: this.vel
  });
}

/**
 * @method toObject
 * @returns {Object} output object
 * Converti une instance Player en objet
 */
Player.prototype.toObject = function() {
  let keys = Object.keys(this);
  let values = Object.values(this);
  let obj = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj;
}

// Export is in node environement
if (!isBrowser) {
  module.exports = Player;
}
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