## Builder
Creational software design pattern that allows the separation of the construction of a complex object from its representation. The constructor class methods always return `this`, allowing you to call chain methods.
```js
class Ninja {
  constructor ({ name, rank }) {
    this.name = name
    this.rank = rank
  }
}

function NinjaBuilder () {
  this.setName = function (name) {
    this.name = name
    return this
  }
  this.setRank = function (rank) {
    this.rank = rank
    return this
  }
  this.build = function () {
    return new Ninja({ name, rank })
  }
  return this
}

const naruto = NinjaBuilder().setName('Naruto Uzumaki').setRank('Hokage').build()
```