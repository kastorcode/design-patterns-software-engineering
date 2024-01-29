## Template Method
Behavioral pattern that defines the structure of an algorithm in the parent class, allowing specific steps to be implemented in different ways in child classes. Useful when you have an algorithm common to several classes, but some parts of the algorithm may vary between those classes.
```js
class Drink {
  constructor ({ name }) {
    this.name = name
  }
  prepare () {
    this.boilWater()
    this.prepareMainIngredient()
    this.pourIntoCup()
  }
  boilWater () {
    console.log('Boiling the water…')
  }
  prepareMainIngredient () {
    throw new Error('not implemented')
  }
  pourIntoCup () {
    console.log(`Pouring ${this.name} into the cup…\n`)
  }
}

class Coffee extends Drink {
  constructor () {
    super({ name: 'coffee' })
  }
  prepareMainIngredient () {
    console.log('Grinding the grains…')
    console.log(`Straining the ${this.name}…`)
  }
}

class Tea extends Drink {
  constructor () {
    super({ name: 'tea' })
  }
  prepareMainIngredient () {
    console.log('Harvesting the herbs…')
    console.log('Mixing it all…')
  }
}

const coffee = new Coffee()
coffee.prepare()
const tea = new Tea()
tea.prepare()
console.log('All drinks are ready.')
```