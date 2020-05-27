const fs = require('fs')

const args = process.argv.slice(2, process.argv.length)

const toyScript = fs.readFileSync(args[0], 'utf8')

console.log(toyScript)