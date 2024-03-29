console.log('Starting...')

const cluster = require('cluster')
const path = require('path')
const fs = require('fs')
const package = require('./package.json')
const CFonts = require('cfonts')
const Readline = require('readline')
const yargs = require('yargs/yargs')

const rl = Readline.createInterface(process.stdin, process.stdout)

CFonts.say('Bot', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']
})
CFonts.say("Bot Original von Baron", {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
})

let isRunning = false

/**
 * Startet eine JavaScript-Datei als Prozess.
 * @param {String} file Pfad zur Datei
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  const args = [path.join(__dirname, file), ...process.argv.slice(2)]
  CFonts.say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  })
  cluster.setupMaster({
    exec: path.join(__dirname, file),
    args: args.slice(1),
  })
  const p = cluster.fork()
  p.on('message', data => {
    console.log('[RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', code => {
    p.kill()
    isRunning = false
    start.apply(this, arguments)
    isRunning = false
    console.error('Exited with code:', code)
    if (code === 0) return
    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0])
      start(file)
    })
  })
  const opts = yargs(process.argv.slice(2)).exitProcess(false).parse()
  if (!opts['test']) {
    if (!rl.listenerCount()) {
      rl.on('line', line => {
        p.emit('message', line.trim())
      })
    }
  }
}
start('index.js');




// Verbesserungen

// Fehlerbehandlung verbessern
cluster.on('error', (error) => {
  console.error('Cluster error:', error);
  // Hier könnte eine angemessene Fehlerbehandlung hinzugefügt werden
});

// Logging verbessern
function logInfo(message) {
  console.log('[INFO]', message);
}

function logError(message) {
  console.error('[ERROR]', message);
}
