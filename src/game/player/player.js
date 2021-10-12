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