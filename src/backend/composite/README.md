## Composite
Structural pattern that allows you to treat individual objects and lists of objects uniformly through recursion.
```js
class Course {
  constructor ({ name, price }) {
    this.name = name
    this.price = price
  }
  getPrice () {
    return this.price
  }
  print () {
    console.log(`${this.name} - $${this.getPrice()}`)
  }
}

class CourseComposite {
  constructor ({ name, composite }) {
    this.name = name
    this.composite = composite
  }
  getPrice () {
    return this.composite.reduce((result, next) => result + next.getPrice(), 0)
  }
  print () {
    console.log(`***** ${this.name} - $${this.getPrice()} *****`.toUpperCase())
    this.composite.forEach(item => item.print())
    console.log('***********************************')
  }
}

const nodejs = new Course({ name: 'NodeJS', price: 70 })
const adonisjs = new Course({ name: 'AdonisJS', price: 60 })
const reactjs = new Course({ name: 'ReactJS', price: 80 })
const reactnative = new Course({ name: 'React Native', price: 90 })
const backendCourses =
  new CourseComposite({ name: 'Back-end Courses', composite: [nodejs, adonisjs] })
const frontendCourses =
  new CourseComposite({ name: 'Front-end Courses', composite: [reactjs, reactnative] })
const allCourses =
  new CourseComposite({ name: 'All Courses', composite: [backendCourses, frontendCourses] })

nodejs.print()
adonisjs.print()
reactjs.print()
reactnative.print()
console.log('\n')
backendCourses.print()
console.log('\n')
frontendCourses.print()
console.log('\n')
allCourses.print()
```