const isWin = process.platform === 'win32';

/**
 * Turn a local path into a global path.
 * @method makePath
 * @param {String} dir the local directory
 * @return global path
 */
module.exports = (dir) => {
  if (isWin) {
    let d = __dirname.split('\\');
    return path = d
      .splice(0, d.length - 3)
      .join('\\') + "\\" + dir;
  } else {
    return '/drives/hddA/github/iogame/public';
  }
}