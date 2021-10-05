const express = require('express');
const app = express();
const port = 3000;
let directory = __dirname.split('\\');
let hostDir = 'public';

let path = directory
  .splice(0, directory.length - 2)
  .join('\\') + "\\" + hostDir;

app.use(express.static(path));

app.listen(port, () => {
  console.log(`Hosting directory ${hostDir} at http://localhost:${port}`)
})