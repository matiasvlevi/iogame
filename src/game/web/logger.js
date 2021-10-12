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