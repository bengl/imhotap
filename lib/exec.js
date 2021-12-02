const { spawn } = require('child_process');
const { runner } = require('./options');

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
  const out = [];
  const err = [];
  if (proc.stdout) proc.stdout.on('data', d => out.push(d));
  if (proc.stderr) proc.stderr.on('data', d => err.push(d));
  proc.on('close', code => resolve({
    out: Buffer.concat(out).toString(),
    err: Buffer.concat(err).toString(),
    file: filename.split(' ')[1] || filename,
    code
  }));
});

module.exports = exec;
