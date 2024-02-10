## ORM
Object-Relational Mapping is used to facilitate interaction between object-oriented systems and databases, it maps programming language objects to tables, allowing data manipulation using objects instead of writing domain-specific language queries. ORM examples: Mongoose for MongoDB, Sequelize for PostgreSQL.
```js
Array.prototype.getRandom = function () {
  return this[Math.floor(Math.random() * Math.floor(this.length))]
}

class MockDatabase {
  static users = [
    { id: 1, username: 'Bill_Gates', email: 'billgates@microsoft.com' },
    { id: 2, username: 'Elon_Musk', email: 'elonmusk@twitter.com' },
    { id: 3, username: 'Mark_Zuckerberg', email: 'markzuckerberg@meta.com' }
  ]
  static getUserRandom () {
    return MockDatabase.users.getRandom()
  }
}

class UserORM {
  constructor ({ id, username, email }) {
    this.id = id
    this.username = username
    this.email = email
  }
  getId () {
    return this.id
  }
  getUsername () {
    return this.username
  }
  getEmail () {
    return this.email
  }
}

const interval = {
  id: null, i: 0
}

interval.id = setInterval(() => {
  const user = new UserORM(MockDatabase.getUserRandom())
  console.log(user, '\n')
  interval.i++
  if (interval.i > 2) clearInterval(interval.id)
}, 1000)
```