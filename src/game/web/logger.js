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