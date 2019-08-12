'use strict';

const { promisify } = require('util');
let { readdir, readFile, stat } = require('fs');
readdir = promisify(readdir);
readFile = promisify(readFile);
stat = promisify(stat);
const fs = require('fs');
const path = require('path');
const pitesti = require('pitesti');
const exec = promisify(require('child_process').exec);
const assert = require('assert');

const test = pitesti();

(async () => {

  const dirs = await readdir(__dirname);

  for (const dir of dirs) {
    const cwd = path.resolve(__dirname, dir);

    if (!(await stat(cwd)).isDirectory()) {
      continue;
    }

    test`test dir ${dir}`(async () => {
      const { stdout } = await exec(`bash ${cwd}/run`, {
        cwd,
        env: Object.assign({}, process.env, { PATH: path.dirname(__dirname) + ':' + process.env.PATH })
      });
      const expected = await readFile(`${cwd}/expected.txt`);
      assert.strictEqual(stdout.toString().trim(), expected.toString().trim());
    });
  }

  test();
})();

