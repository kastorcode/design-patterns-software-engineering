## Factory
Defines a function to create an object of a specific type.
```js
function validate ({ name, level }) {
  if (typeof name !== 'string' || name.length < 2 || name.length > 32) {
    throw new Error('invalid name')
  }
  if (typeof level !== 'string' || (level !== 'J' && level !== 'M' && level !== 'S')) {
    throw new Error('invalid level')
  }
}

export default function developerFactory ({ name, level }) {
  validate({ name, level })
  return {
    type: 'DEVELOPER', name, level
  }
}
```