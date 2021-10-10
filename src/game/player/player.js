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