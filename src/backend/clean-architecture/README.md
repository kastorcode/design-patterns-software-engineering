## Clean Architecture
Software design pattern proposed by Robert C. Martin, also known as Uncle Bob. The standard is divided into 4 layers, each with its specific responsibility, the objective is to create systems that are independent of frameworks, testable and can be easily adapted to changes.

## Entities
Abstraction of business objects from the application domain, encapsulates state and business rules.
```js
class User {
  constructor ({ id, name }) {
    this.id = id
    this.name = name
  }
  getId () {}
  getName () {}
  setId () {}
  setName () {}
}
```

## Use Cases
Contain application-specific business rules, coordinating the operations required across entities to perform specific tasks.
```js
class UserUseCase {
  constructor ({ repository }) {
    this.repository = repository
  }
  getUser ({ userId }) {}
  createUser ({ user }) {}
}
```

## Adapters
Interfaces that connect internal to external layers, such as frameworks and databases, ensuring that the business layer (Use Cases) remains isolated.
```js
class UserRepository {
  getUser ({ userId }) {}
  saveUser ({ user }) {}
}
```

## Frameworks and Drivers
Outer layers that handle specific infrastructure details, such as web frameworks and database libraries.
```js
import express from 'express'
import { UserController } from '~/controllers'

const app = express()

app.post('/users', UserController.createUser)

app.listen(3000)
```