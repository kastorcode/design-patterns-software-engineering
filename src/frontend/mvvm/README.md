## MVVM
The Model-View-ViewModel design pattern is a software architectural approach that separates presentation logic from business logic in an application. Model: represents the data and business logic. View: responsible for presenting and displaying data to the user. ViewModel: connects the View and the Model, transforming the Model data to be presented in the View. This pattern makes use of the concept of data binding, a technique where changes to ViewModel data are automatically reflected in the View, eliminating the need for manual updates. The ReactJS useState hook is an example of data binding.
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
  setName (name) {
    this.name = name
  }
  setAge (age) {
    this.age = age
  }
  setRank (rank) {
    this.rank = rank
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
  print ({ name, age, rank }) {
    console.log('***** NINJA DATA *****')
    console.log(`Name: ${name}`)
    console.log(`Age: ${age}`)
    console.log(`Rank: ${rank}`)
    console.log('**********************\n')
  }
}

class NinjaVM {
  constructor ({ model, views = [] }) {
    this.model = model
    this.views = views
  }
  setName (name) {
    this.model.setName(name)
    this.model.validateName()
    this.notifyViews()
  }
  setAge (age) {
    this.model.setAge(age)
    this.model.validateAge()
    this.notifyViews()
  }
  setRank (rank) {
    this.model.setRank(rank)
    this.model.validateRank()
    this.notifyViews()
  }
  getNinja () {
    this.model.validate()
    return JSON.stringify(this.model)
  }
  notifyViews () {
    this.model.validate()
    this.views.forEach(view => view(this.model))
  }
  subscribeViews (views) {
    views.forEach(view => this.views.push(view))
  }
}

const narutoModel = new NinjaModel({ name: 'Naruto Uzumaki', age: 12, rank: 'Genin' })
const narutoView = new NinjaView()
const narutoVM = new NinjaVM({ model: narutoModel, views: [narutoView.print] })

narutoVM.notifyViews()
narutoVM.setAge(13)
```