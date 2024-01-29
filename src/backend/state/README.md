## State
Behavioral pattern that allows an object to change its behavior when its state changes. Several state classes sign the same interface contract, changing the methods implementation as needed.
```js
class Order {
  constructor () {
    this.state = new WaitingPaymentState({ order: this })
  }
  pay () {
    this.state.pay()
  }
  ship () {
    this.state.ship()
  }
  cancel () {
    this.state.cancel()
  }
}

class State {
  constructor ({ order }) {
    this.order = order
  }
  pay () {
    throw new Error('not implemented')
  }
  ship () {
    throw new Error('not implemented')
  }
  cancel () {
    throw new Error('not implemented')
  }
}

class WaitingPaymentState extends State {
  pay () {
    console.log('Paying order…')
    this.order.state = new PaidState({ order: this.order })
  }
  ship () {
    throw new Error('the order is waiting payment')
  }
  cancel () {
    console.log('Canceling order…')
    this.order.state = new CanceledState({ order: this.order })
  }
}

class PaidState extends State {
  pay () {
    throw new Error('the order is already paid')
  }
  ship () {
    console.log('Shipping order…')
    this.order.state = new ShippedState({ order: this.order })
  }
  cancel () {
    console.log('Canceling order…')
    this.order.state = new CanceledState({ order: this.order })
  }
}

class ShippedState extends State {
  pay () {
    throw new Error('the order is already paid')
  }
  ship () {
    throw new Error('the order is already shipped')
  }
  cancel () {
    throw new Error('the order is already shipped')
  }
}

class CanceledState extends State {
  pay () {
    console.log('Paying order…')
    this.order.state = new PaidState({ order: this.order })
  }
  ship () {
    throw new Error('the order is canceled')
  }
  cancel () {
    throw new Error('the order is already canceled')
  }
}

try {
  const order = new Order()
  order.pay()
  order.ship()
  order.cancel()
}
catch (error) {
  console.error(error.toString())
}
```