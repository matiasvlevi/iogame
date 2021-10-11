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
    this.speed = 1.5;
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
  update() {


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
  addForce(x, y) {
    this.vel.x += x * this.speed;
    this.vel.y += y * this.speed;

    socket.emit('updatePos', {
      sid: this.sid,
      pos: this.pos,
      vel: this.vel
    });
  }
}

// Export is in node environement
if (!isBrowser) {
  module.exports = Player;
}