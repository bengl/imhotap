const { spawn } = require('child_process');
const { stream } = require('./options');

const exec = filename => new Promise((resolve, reject) => {
  const [name, ...args] = filename.split(' ');
  const proc = spawn(name, args);
  proc.on('error', err => {
    if (filename.startsWith('node ') || !filename.endsWith('.js')) {
      reject(err);
    } else {
      resolve(exec('node ' + filename));
    }
  });
  if (proc[stream]) {
    const out = [];
    proc[stream].on('data', d => out.push(d));
    proc.on('close', code => resolve({
      out: Buffer.concat(out).toString(),
      file: filename.split(' ')[1] || filename,
      code
    }));
  }
});

module.exports = exec;
