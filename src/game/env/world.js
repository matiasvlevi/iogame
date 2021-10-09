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