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