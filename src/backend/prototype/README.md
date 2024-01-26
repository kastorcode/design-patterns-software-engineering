## Prototype
Creational software design pattern that determines that the creation of new objects must occur by cloning an object already instantiated in memory.
```js
const naruto = {
  name: 'Naruto Uzumaki',
  age: 12,
  rank: 'Genin',
  clone: function (data) {
    return { ...this, ...data }
  }
}

const sasuke = naruto.clone({ name: 'Sasuke Uchiha' })
```