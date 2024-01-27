## Chain of Responsibility
Behavioral pattern that allows a request to be passed through a chain of handlers where each handler decides whether to process the request or pass it on to the next handler in the chain.
```js
const ROLES = {
  ADMIN: 4,
  MODERATOR: 3,
  PUBLISHER: 2,
  READER: 1
}

const users = {
  admin: { password: '12345', role: 'ADMIN' }
}

class User {
  constructor ({ username, password, role }) {
    this.username = username
    this.password = password
    this.role = role
  }
}

class UsernameValidator {
  constructor ({ user, nextValidator = null }) {
    this.user = user
    this.nextValidator = nextValidator
  }
  validate () {
    const { username } = this.user
    if (typeof username !== 'string' || username.length < 2 || username.length > 32) {
      throw new Error('invalid username')
    }
    else if (users[username]) {
      throw new Error('already registered username')
    }
    else if (this.nextValidator) {
      this.nextValidator.validate()
    }
  }
}

class PasswordValidator {
  constructor ({ user, nextValidator = null }) {
    this.user = user
    this.nextValidator = nextValidator
  }
  validate () {
    const { password } = this.user
    if (typeof password !== 'string' || password.length < 5 || password.length > 16) {
      throw new Error('invalid password')
    }
    else if (this.nextValidator) {
      this.nextValidator.validate()
    }
  }
}

class RoleValidator {
  constructor ({ user, nextValidator = null }) {
    this.user = user
    this.nextValidator = nextValidator
  }
  validate () {
    const { role } = this.user
    if (typeof role !== 'string' || !ROLES[role]) {
      throw new Error('invalid role')
    }
    else if (role === 'ADMIN') {
      throw new Error("you can't register an admin")
    }
    else if (this.nextValidator) {
      this.nextValidator.validate()
    }
  }
}

function register (user) {
  try {
    const roleValidator = new RoleValidator({ user })
    const passwordValidator = new PasswordValidator({
      user, nextValidator: roleValidator })
    const usernameValidator = new UsernameValidator({
      user, nextValidator: passwordValidator })
    usernameValidator.validate()
    const { username, password, role } = user
    users[username] = { password, role }
    console.log(users)
  }
  catch (error) {
    console.error(error)
  }
}

const matheus = new User({
  username: 'matheus', password: 'senha', role: 'MODERATOR'
})

register(matheus)
```