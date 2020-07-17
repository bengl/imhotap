const { spawnSync } = require('child_process')

function runImhotap(...args) {
  const { status } = spawnSync('imhotap', args, { stdio: 'inherit' })
  console.log('=============== result', status)
}

module.exports = { runImhotap }
