const fs = require('fs')
const toyInterpreter = require('./interpreter')

const args = process.argv.slice(2, process.argv.length)

const toyScript = fs.readFileSync(args[0], 'utf8')

const interpreter = new toyInterpreter()

interpreter.interpret(toyScript)