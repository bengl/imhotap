'use strict';

const os = require('os');

const options = require('yargs')
  .help()
  .pkgConf('imhotap')
  .option('f', {
    alias: 'files',
    default: 'test/**/test*.js',
    describe: 'glob pattern for while files to run',
    type: 'string'
  })
  .array('f')
  .option('c', {
    alias: 'concurrency',
    default: os.cpus().length - 1,
    describe: 'how many test files to run in parallel (0 == Infinity)',
    type: 'number'
  })
  .option('r', {
    alias: 'reporter',
    default: 'tap',
    describe: 'which tap reporter to use, or just `tap`',
    type: 'string'
  })
  .option('q', {
    alias: 'quieter',
    default: false,
    describe: 'whether or not to include subtests on success',
    type: 'boolean'
  })
  .option('R', {
    alias: 'runner',
    describe: 'a script runner for running test files (e.g. tsnode, etc.)',
    type: 'string'
  })
  .option('e', {
    alias: 'test-env',
    describe: 'set an environment variable to the test file and runner',
    type: 'string'
  })
  .array('e')
  .option('s', {
    alias: 'stream',
    default: 'stdout',
    describe: 'stream to expect TAP output from test files',
    choices: ['stdout', 'stderr']
  })
  .argv;

function validateOptions() {
  if (options.stream !== 'stdout' && options.stream !== 'stderr') {
    throw new TypeError(`stream must be 'stdout' or 'stderr'`);
  }
  if (!Number.isInteger(options.concurrency) || options.concurrency < 0) {
    throw new TypeError(`concurrency must be a non-negative integer`);
  }
}

validateOptions();

module.exports = options;
