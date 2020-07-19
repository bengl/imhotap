const { spawn } = require('child_process');
const { stream, runner } = require('./options');

const exec = filename => new Promise((resolve, reject) => {
  let [name, ...args] = filename.split(' ');
  if (runner) {
    args.unshift(name);
    name = runner;
  }
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
