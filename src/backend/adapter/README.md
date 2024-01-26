## Adapter
Adapter or Wrapper, is a structural design pattern that converts one interface to another by translating its methods, allowing the use of the same methods in different classes.
```js
class Car {
  run () {
    console.log('car is running')
  }
}

class Plane {
  fly () {
    console.log('plane is flying')
  }
}

/*
  Cars don't fly, so this class translates the methods of a Plane,
  allowing the dev to use the same methods in different classes.
*/
class CarAdapter extends Plane {
  constructor (car) {
    super()
    this.car = car
  }
  fly () {
    this.car.run()
  }
}

class PlaneAdapter extends Car {
  constructor (plane) {
    super()
    this.plane = plane
  }
  run () {
    this.plane.fly()
  }
}

const car = new Car()
car.run()
const plane = new Plane()
plane.fly()
const carAdapter = new CarAdapter(car)
carAdapter.fly()
const planeAdapter = new PlaneAdapter(plane)
planeAdapter.run()
```