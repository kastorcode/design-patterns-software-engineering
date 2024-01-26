## Abstract Factory
Allows the creation of families of related objects through a single interface. In other words, Inheritance is combined with the Factory pattern to standardize properties, methods and instantiations.
```js
class Char {
  attack () {
    throw new Error('not implemented')
  }
}

class Ninja extends Char {
  attack () {
    console.log('ninja attack')
  }
}

class Samurai extends Char {
  attack () {
    console.log('samurai attack')
  }
}

class CharFactory {
  create () {
    throw new Error('not implemented')
  }
}

export class NinjaFactory extends CharFactory {
  create () {
    return new Ninja()
  }
}

export class SamuraiFactory extends CharFactory {
  create () {
    return new Samurai()
  }
}
```