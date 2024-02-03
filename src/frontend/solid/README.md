## SOLID
In object-oriented programming, the term SOLID is an acronym for five design postulates intended to facilitate the understanding, development, and maintenance of software.

## SRP - Single Responsibility Principle
A class must have only one reason to change, that is, it must have only one responsibility.
```js
// Incorrect
class StaffManager {
  constructor ({ staff = [] }) {
    this.staff = staff
  }
  addCollaborator (collaborator) {}
  calculatePayroll () {}
}

// Correct
class StaffManager {
  constructor ({ staff = [] }) {
    this.staff = staff
  }
  addCollaborator (collaborator) {}
}

class CalculatePayroll {
  calculatePayroll (staff) {}
}
```

## OCP - Open/Closed Principle
A class must be open for extension, but closed for modification.
```js
// Incorrect
class AreaCalculator {
  calculateArea (shape) {
    if (shape.type === 'square')
      return shape.side * shape.side
    else if (shape.type === 'circle')
      return Math.PI * shape.radius * shape.radius
  }
}

// Correct
class AreaCalculator {
  calculateArea (shape) {
    return shape.calculateArea()
  }
}

class Square extends Shape {
  calculateArea () {}
}

class Circle extends Shape {
  calculateArea () {}
}
```

## LSP - Liskov Substitution Principle
Objects of a superclass must be replaceable by objects of its subclasses without affecting the correctness of the program.
```js
// Incorrect
class Bird {
  fly () {}
}

class Penguin extends Bird {
  // Mistake, penguins don't fly
  fly () {}
}

// Correct
class Bird {}

class FlyBird extends Bird {
  fly () {}
}

class Penguin extends Bird {}
```

## ISP - Interface Segregation Principle
A class should not be forced to implement interfaces that it does not use.
```js
// Incorrect
class Interface {
  method1 () {
    throw new Error('not implemented')
  }
  method2 () {
    throw new Error('not implemented')
  }
}

class Implementation extends Interface {
  method1 () {}
  // Mistake, Implementation does not need method2
}

// Correct
class Interface1 {
  method1 () {
    throw new Error('not implemented')
  }
}

class Interface2 {
  method2 () {
    throw new Error('not implemented')
  }
}

class Implementation extends Interface1 {
  method1 () {}
}
```

## DIP - Dependency Inversion Principle
Code decoupling technique that determines that high-level modules should not depend on low-level modules, both must depend on interfaces. Interfaces should not depend on implementations, but implementations should depend on interfaces.
```js
// Incorrect
class Database {
  saveData (data) {}
}

class Email {
  sendEmail (message) {}
}

class App {
  constructor () {
    this.database = new Database()
    this.email = new Email()
  }
  businessRules ({ data }) {
    this.database.saveData(data)
    this.email.sendEmail('Data processed successfully')
  }
}

// Correct
class App {
  constructor ({ dataSaver, notifier }) {
    this.dataSaver = dataSaver
    this.notifier = notifier
  }
  businessRules ({ data }) {
    this.dataSaver.saveData(data)
    this.notifier.notify('Data processed successfully')
  }
}
```