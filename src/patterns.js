import { readFileSync } from 'fs'
import { join, resolve } from 'path'


const src = join(resolve(), 'src')
const backend = join(src, 'backend')
const frontend = join(src, 'frontend')
const md = 'README.md'

const name = [
  'Abstract Factory',
  'Adapter',
  'Builder',
  'Chain of Responsibility',
  'Clean Architecture',
  'Command',
  'Composite',
  'Decorator',
  'Dependency Injection',
  'Facade',
  'Factory',
  'Module',
  'MVC',
  'MVVM',
  'Observer',
  'Prototype',
  'Proxy',
  'Singleton',
  'SOLID',
  'State',
  'Strategy',
  'Template Method'
]

const markdown = [
  join(backend, 'abstract-factory', md),
  join(backend, 'adapter', md),
  join(backend, 'builder', md),
  join(backend, 'chain-of-responsibility', md),
  join(backend, 'clean-architecture', md),
  join(backend, 'command', md),
  join(backend, 'composite', md),
  join(backend, 'decorator', md),
  join(frontend, 'dependency-injection', md),
  join(frontend, 'facade', md),
  join(backend, 'factory', md),
  join(frontend, 'module', md),
  join(frontend, 'mvc', md),
  join(frontend, 'mvvm', md),
  join(backend, 'observer', md),
  join(backend, 'prototype', md),
  join(backend, 'proxy', md),
  join(backend, 'singleton', md),
  join(frontend, 'solid', md),
  join(backend, 'state', md),
  join(backend, 'strategy', md),
  join(backend, 'template-method', md)
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