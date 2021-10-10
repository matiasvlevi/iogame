const makePath = require('./lib/makePath.js');

const express = require('express');
const app = express();

// Host port
const port = 8080;

// Parse ./public path
let path = makePath('doc/build');

// Host directory
app.use(express.static(path));

// Listen to port 8080
app.listen(port, () => {
  console.log(`Hosting directory ${path} at http://localhost:${port}`)
})