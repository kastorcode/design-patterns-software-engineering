import { readFileSync } from 'fs'
import { join, resolve } from 'path'


const src = join(resolve(), 'src')

const backend = join(src, 'backend')

const md = 'README.md'

const name = [
  'Abstract Factory',
  'Adapter',
  'Builder',
  'Chain of Responsibility',
  'Command',
  'Decorator',
  'Factory',
  'Observer',
  'Prototype',
  'Singleton',
  'Strategy'
]

const markdown = [
  join(backend, 'abstract-factory', md),
  join(backend, 'adapter', md),
  join(backend, 'builder', md),
  join(backend, 'chain-of-responsibility', md),
  join(backend, 'command', md),
  join(backend, 'decorator', md),
  join(backend, 'factory', md),
  join(backend, 'observer', md),
  join(backend, 'prototype', md),
  join(backend, 'singleton', md),
  join(backend, 'strategy', md)
]


function getLog () {
  let message = '\n\n'
  for (const i in name) {
    message += `${i}: ${name[i]}\n`
  }
  message += '\nany string to exit\n'
  return message
}


markdown.log = getLog()


markdown.exist = function (index) {
  return markdown[index] ? true : false
}


markdown.get = function (index) {
  return readFileSync(markdown[index]).toString()
}


export default markdown