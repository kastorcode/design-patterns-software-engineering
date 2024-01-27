## Strategy
Software development behavioral pattern that allows to define new operations without changing classes. Different implementations sign the same interface contract, making it possible to choose which method to call at run time.
```js
const missionRanks = {
  'D': { calculatePayment: (bonus) => 5000 + bonus },
  'C': { calculatePayment: (bonus) => 30000 + bonus },
  'B': { calculatePayment: (bonus) => 80000 + bonus },
  'A': { calculatePayment: (bonus) => 150000 + bonus },
  'S': { calculatePayment: (bonus) => 1000000 + bonus }
}

function paymentStrategy ({ rank, bonus }) {
  if (!missionRanks[rank]) {
    throw new Error('invalid mission rank')
  }
  if (isNaN(bonus) || bonus < 0 || bonus > 1000000) {
    throw new Error('invalid bonus')
  }
  return missionRanks[rank].calculatePayment(bonus)
}

class Mission {
  constructor ({ rank, bonus = 0 }) {
    this.rank = rank
    this.bonus = bonus
  }
  getPayment () {
    return paymentStrategy({ rank: this.rank, bonus: this.bonus })
  }
}

class Ninja {
  constructor ({ name, mission }) {
    this.name = name
    this.mission = mission
  }
  getPayment () {
    return `${this.name} received ${this.mission.getPayment()} ryō for the mission.`
  }
}

let mission = new Mission({ rank: 'D', bonus: 500 })
console.log(new Ninja({ name: 'Naruto', mission }).getPayment())
mission = new Mission({ rank: 'C', bonus: 6000 })
console.log(new Ninja({ name: 'Iruka', mission }).getPayment())
mission = new Mission({ rank: 'B', bonus: 24000 })
console.log(new Ninja({ name: 'Kakashi', mission }).getPayment())
mission = new Mission({ rank: 'A', bonus: 60000 })
console.log(new Ninja({ name: 'Itachi', mission }).getPayment())
mission = new Mission({ rank: 'S', bonus: 500000 })
console.log(new Ninja({ name: 'Hiruzen', mission }).getPayment())
```