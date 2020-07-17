'use strict';

const { spawn } = require('child_process');
const { reporter } = require('./options');
const which = require('which');

function outputPipe () {
  if (reporter === 'tap') {
    return process.stdout;
  }

  const reporterExecutable = which.sync(reporter, { nothrow: true });
  return spawn(reporterExecutable || `npx ${reporter}`, {
    shell: true,
    stdio: ['pipe', 'inherit', 'inherit']
  }).on('error', e => {
    console.error(`Unable to start reporter because:\n${e}`);
    process.exit(1);
  }).stdin;
}

module.exports = outputPipe;
