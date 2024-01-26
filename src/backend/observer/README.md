## Observer
Defines a one-to-many dependency between objects, when an object changes state, all its dependents are notified. In simple words: a class with data and an array of functions, when the data changes, the array is traversed by calling the functions and passing the data as a parameter.
```js
class Subject {
  constructor (data = null) {
    this.data = data
    this.observers = []
  }
  setData (newData, wipeData = false) {
    if (wipeData) {
      this.data = newData
    }
    else {
      this.data = {
        ...this.data, ...newData
      }
    }
  }
  subscribe (fn) {
    return ((this.observers.push(fn)) - 1)
  }
  unsubscribe (index) {
    if (index < 0 || index >= this.observers.length) {
      return false
    }
    this.observers.splice(index, 1)
    return true
  }
  unsubscribeAll () {
    this.observers = []
  }
  notify () {
    this.observers.forEach(fn => fn(this.data))
  }
}

function subscribed (data) {
  data.calls++
  console.log(data)
  if (data.calls === 5) {
    clearInterval(intervalId)
    console.log(`unsubscribed: ${subject.unsubscribe(index)}`)
  }
}

const subject = new Subject()
subject.setData({ calls: 0 }, true)
const index = subject.subscribe(subscribed)
const intervalId = setInterval(() => subject.notify(), 1000)
```