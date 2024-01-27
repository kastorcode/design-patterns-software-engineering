## Command
Behavioral pattern that encapsulates all the information necessary to execute and undo an action in a single class. The class must sign an interface contract and another class must store action history as well as undo an action.
```js
import nodereadline from 'node:readline'

const readline = nodereadline.createInterface({
  input: process.stdin, output: process.stdout
})

function getInput () {
  readline.question('Write some text (B = bold, U = undo, Q = quit):\n\n', inputHandler)
}

function log (str) {
  console.log('\n')
  console.log(str)
  console.log('\n')
}

function inputHandler (input) {
  switch (input) {
    case 'B': {
      const boldCommand = new BoldCommand()
      const str = boldCommand.do(commandHistory.get())
      commandHistory.push(boldCommand)
      log(str)
      break
    }
    case 'U': {
      commandHistory.undo()
      log(commandHistory.get())
      break
    }
    case 'Q': {
      readline.close()
      return
    }
    default: {
      const textCommand = new TextCommand()
      textCommand.do(input)
      commandHistory.push(textCommand)
      console.log('\n')
      break
    }
  }
  getInput()
}

const DEFAULT_STR = '<kastor.code/>'

class TextCommand {
  do (str) {
    this.str = str
    return str
  }
  undo () {
    return this.str
  }
}

class BoldCommand {
  do (str) {
    this.str = str
    return '\x1b[1m' + str + '\x1b[0m'
  }
  undo () {
    return this.str
  }
}

class CommandHistory {
  constructor () {
    this.history = []
  }
  push (command) {
    this.history.push(command)
  }
  undo () {
    const command = this.history.pop()
    return command ? command.undo() : DEFAULT_STR
  }
  get () {
    const { length } = this.history
    return length ? this.history[length - 1].undo() : DEFAULT_STR
  }
}

const commandHistory = new CommandHistory()
getInput()
```