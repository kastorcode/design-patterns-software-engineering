import nodereadline from 'node:readline'

import patterns from './patterns'


const readline = nodereadline.createInterface({
  input: process.stdin, output: process.stdout
})


function inputHandler (input) {
  console.log('\n')
  const index = Number(input)
  if (isNaN(index)) {
    readline.close()
    return
  }
  else if (!patterns.exist(index)) {
    console.log('\x1b[31m', '\tPattern not found', '\x1b[0m')
  }
  else {
    console.log(climd ? climd(patterns.get(index)) : patterns.get(index))
  }
  chooseHandler()
}


function chooseHandler () {
  console.log(patterns.log)
  readline.question('Choose a pattern: ', inputHandler)
}


let climd
import('cli-markdown')
  .then(module => climd = module.default)
  .catch(() => climd = null)
  .finally(() => {
    console.log('\n\t', '\x1b[1m', '\x1b[7m', '<kastor.code/>', '\x1b[0m')
    !climd && console.warn('\x1b[33m', ' ⚠️  Install cli-markdown package for prettier output', '\x1b[0m')
    chooseHandler()
  })