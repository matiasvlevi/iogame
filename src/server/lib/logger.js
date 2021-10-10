class gameServer {}

gameServer.log = (msg, world) => {
  let n = Object.values(world.players).length;
  let t = 20;
  let date = new Date().toLocaleTimeString().slice(0, 5);
  let head = `[\x1b[33m${date}\x1b[0m]` + `[\x1b[33m${n}\x1b[0m/\x1b[33m${t}\x1b[0m] > `;
  let str = head + msg;
  console.log(str);
  return str;
}

module.exports = gameServer;