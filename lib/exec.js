const { spawn } = require('child_process');
const opts = require('./options');

const runner = opts.runner;
const testEnv = opts.testEnv ? {
  ...process.env,
  ...opts.testEnv.reduce((acc, cur) => {
    const [k,v] = cur.split('=')
    return { ...acc, [k]: v}
  }, {})
} : process.env;

const exec = filename => new Promise((resolve, reject) => {
  let [name, ...args] = filename.split(' ');
  if (runner) {
    const [runnerCmd, ...runnerArgs] = runner.split(' ')
    args.unshift(name);
    while (runnerArgs.length) {
      args.unshift(runnerArgs.pop())
    }
    name = runnerCmd;
  }
  const proc = spawn(name, args, { env: testEnv });
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
