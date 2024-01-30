## MVC
The MVC design pattern is an architectural approach that separates an application into three main components: Model, View and Controller. Model: represents the data and business logic of the application. View: responsible for presenting data to the user and for the graphical interface. Controller: acts as an intermediary between the Model and the View, it receives user input, manipulates the Model as necessary and updates the View.
```js
const RANKS = {
  Genin: true,
  Chunin: true,
  Jounin: true
}

class NinjaModel {
  constructor ({ name, age, rank }) {
    this.name = name
    this.age = age
    this.rank = rank
  }
  getName () {
    return this.name
  }
  getAge () {
    return this.age
  }
  getRank () {
    return this.rank
  }
  validateName () {
    if (typeof this.name !== 'string' || this.name.length < 2 || this.name.length > 32) {
      throw new Error('invalid name')
    }
  }
  validateAge () {
    if (typeof this.age !== 'number' || this.age < 7 || this.age > 120) {
      throw new Error('invalid age')
    }
  }
  validateRank () {
    if (typeof this.rank !== 'string' || !RANKS[this.rank]) {
      throw new Error('invalid rank')
    }
  }
  validate () {
    this.validateName()
    this.validateAge()
    this.validateRank()
  }
}

class NinjaView {
  constructor ({ name, age, rank }) {
    this.name = name
    this.age = age
    this.rank = rank
  }
  print () {
    console.log('***** NINJA DATA *****')
    console.log(`Name: ${this.name}`)
    console.log(`Age: ${this.age}`)
    console.log(`Rank: ${this.rank}`)
    console.log('**********************')
  }
}

class NinjaController {
  constructor ({ model, view }) {
    this.model = model
    this.view = view
  }
  getNinja () {
    try {
      this.model.validate()
      return JSON.stringify(this.model)
    }
    catch (error) {
      return error.toString()
    }
  }
  printNinja () {
    try {
      this.model.validate()
      this.view.print()
    }
    catch (error) {
      console.error(error.toString())
    }
  }
}

const narutoModel = new NinjaModel({ name: 'Naruto Uzumaki', age: 12, rank: 'Genin' })
const narutoView = new NinjaView(narutoModel)
const narutoController = new NinjaController({ model: narutoModel, view: narutoView })

console.log(narutoController.getNinja(), '\n')
narutoController.printNinja()
```