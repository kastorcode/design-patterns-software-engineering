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
  'Flux',
  'Middleware',
  'Module',
  'MVC',
  'MVVM',
  'N-Layer',
  'Observer',
  'ORM',
  'Prototype',
  'Proxy',
  'Repository',
  'Singleton',
  'SOLID',
  'SPA',
  'SSR',
  'State',
  'Strategy',
  'Template Method',
  'WebSocket'
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
  join(frontend, 'flux', md),
  join(backend, 'middleware', md),
  join(frontend, 'module', md),
  join(frontend, 'mvc', md),
  join(frontend, 'mvvm', md),
  join(frontend, 'n-layer', md),
  join(backend, 'observer', md),
  join(frontend, 'orm', md),
  join(backend, 'prototype', md),
  join(backend, 'proxy', md),
  join(frontend, 'repository', md),
  join(backend, 'singleton', md),
  join(frontend, 'solid', md),
  join(frontend, 'spa', md),
  join(frontend, 'ssr', md),
  join(backend, 'state', md),
  join(backend, 'strategy', md),
  join(backend, 'template-method', md),
  join(frontend, 'websocket', md)
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