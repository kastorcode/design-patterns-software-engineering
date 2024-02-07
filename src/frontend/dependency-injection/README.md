## Dependency Injection
Technique that aims to facilitate testing, maintenance and reuse of code through control inversion. Instead of a component creating its own dependencies, they are injected from outside, making the code more decoupled and flexible.
```js
// Incorrect
class Logger {
  print (message) {}
  save (message) {}
}

class User {
  constructor () {
    this.logger = new Logger()
  }
}

// Correct
class User {
  constructor ({ logger }) {
    this.logger = logger
  }
}
```