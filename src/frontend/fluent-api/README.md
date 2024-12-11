## Fluent API
It uses chained methods to create a more readable and natural programming interface by returning the object itself (this), allowing for concise configuration, more fluid reading and removing temporary variables.
```js
class TextBuilderFluentAPI {

  constructor () {
    this.text = ''
  }

  addText (text) {
    if (typeof text !== 'string') throw new Error('text must be a string')
    if (!text.length)             throw new Error('text must not be empty')
    this.text += text
    return this
  }

  addSpace () {
    this.text += ' '
    return this
  }

  addLineBreak () {
    this.text += '\n'
    return this
  }

  build () {
    return this.text
  }

}

const text = new TextBuilderFluentAPI()
  .addLineBreak()
  .addText('Hello,')
  .addSpace()
  .addText('World!')
  .addLineBreak()
  .build()

console.log('***** FLUENT API *****')
console.log(text)
console.log('**********************')
```