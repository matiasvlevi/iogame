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