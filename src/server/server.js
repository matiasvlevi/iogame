const express = require('express');
const app = express();

// Host port
const port = 3000;

// Parse ./public path
let d = __dirname.split('\\');
let hostDir = 'public';
let path = d
  .splice(0, d.length - 2)
  .join('\\') + "\\" + hostDir;

// Host directory
app.use(express.static(path));

// Listen to port 3000
app.listen(port, () => {
  console.log(`Hosting directory ${hostDir} at http://localhost:${port}`)
})