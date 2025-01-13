## Domain Notification
Approach to handling errors or business rule violations by collecting all notifications in a centralized list instead of throwing exceptions.
```js
class Notification {
  constructor (property, message) {
    this.property = property
    this.message = message
  }
}

class Notifier {
  constructor () {
    this.notifications = []
  }
  addNotification (property, message) {
    const notification = new Notification(property, message)
    this.notifications.push(notification)
  }
  hasNotifications () {
    return this.notifications.length > 0
  }
  getNotifications () {
    return this.notifications
  }
}

class User {
  constructor (name, email) {
    this.name = name
    this.email = email
    this.notifier = new Notifier()
  }
  validate () {
    if (typeof this.name !== 'string' || this.name.length < 2 || this.name.length > 32) {
      this.notifier.addNotification('name', 'The name must be between 2 and 32 characters.')
    }
    if (typeof this.email !== 'string' || !this.email.includes('@')) {
      this.notifier.addNotification('email', 'The email is invalid.')
    }
  }
}

const users = [
  new User('m', 'kastorcode'), // Invalid user
  new User('Matheus', 'kastorcode@gmail.com') // Valid user
]

users.forEach(user => user.validate())

users.forEach(user => {
  if (user.notifier.hasNotifications()) {
    console.error('Errors found:')
    const notifications = user.notifier.getNotifications()
    notifications.forEach(({ property, message }) => {
      console.error(` - [${property}] ${message}`)
    })
  }
  else {
    console.log(`User ${user.name} is valid!`)
  }
})
```
Output:
```shell
Errors found:
 - [name] The name must be between 2 and 32 characters.
 - [email] The email is invalid.
User Matheus is valid!
```