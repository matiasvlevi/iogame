/**
 * Multiply two numbers.
 * @method myfunc
 * @param a first factor
 * @param b second factor
 * 
 */
function myfunc(a, b) {
  return a * b;
}
/**
 * Multiply two numbers and add a bias.
 * @method myfunc2
 * @param a first factor
 * @param b second factor
 * @param c translate
 * 
 */
function myfunc2(a, b, c) {
  return a * b + c;
}
/**
 * p5js Canvas Setup
 */
let wnx = window.innerWidth;
let wny = window.innerHeight;

function setup() {
  createCanvas(wnx, wny);
}

/**
 * p5js Canvas Setup
 */
function draw() {
  background(51);
}