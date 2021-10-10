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
    this.wn = {
      x: 800,
      y: 800
    }
    this.skins = {
      default: [255, 255, 255]
    };
  }
  update() {
    for (let player in world.players) {
      world.players[player].update();
    }
  }
  setSize(x, y) {
    this.wn = {
      x,
      y
    }
  }
  playerJoin(name = 'username') {
    socket.emit('playerJoin', name);
  }
  addPlayer(name, sid) {
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