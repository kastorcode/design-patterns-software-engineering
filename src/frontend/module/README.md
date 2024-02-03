## Module
Approach that allows you to organize code into independent modules, encapsulating variables and functions to avoid name conflicts and promote a more reusable structure.
```js
// _ is a convention for private variables and functions

// This function has its own context
const availableNinjas = (function () {
  function _getAvailableNinjas () {
    return [
      'Naruto Uzumaki',
      'Sasuke Uchiha',
      'Sakura Haruno',
      'Kakashi Hatake'
    ]
  }

  const _ninjaList = _getAvailableNinjas()
  const _NO_NINJA = 'ninja not found'

  function allocateNinja (index) {
    index--
    if (!_ninjaList[index]) {
      throw new Error(_NO_NINJA)
    }
    return _ninjaList.splice(index, 1)[0]
  }

  function getNinja (index) {
    index--
    if (!_ninjaList[index]) {
      throw new Error(_NO_NINJA)
    }
    return _ninjaList[index]
  }

  function makeNinjaAvailable (ninja) {
    if (typeof ninja !== 'string' || ninja.length < 2 || ninja.length > 32) {
      throw new Error('invalid ninja')
    }
    _ninjaList.forEach(ninjaInList => {
      if (ninjaInList === ninja) {
        throw new Error('ninja already available')
      }
    })
    _ninjaList.push(ninja)
    return ninja
  }

  function printNinjas () {
    console.log('***** AVAILABLE NINJAS *****')
    _ninjaList.forEach((ninja, index) => console.log(`${index + 1}. ${ninja}`))
    console.log('****************************\n')
  }

  // Returned variables and functions are publicly available
  return {
    allocateNinja,
    getNinja,
    makeNinjaAvailable,
    printNinjas
  }
})()

availableNinjas.printNinjas()
console.log(`getNinja: ${availableNinjas.getNinja(1)}`)
console.log(`allocateNinja: ${availableNinjas.allocateNinja(2)}`)
console.log(`makeNinjaAvailable: ${availableNinjas.makeNinjaAvailable('Konohamaru Sarutobi')}\n`)
availableNinjas.printNinjas()
```