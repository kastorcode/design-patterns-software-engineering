## Composition
Composition in object-oriented programming (OOP) is a concept that involves creating complex objects by combining simpler objects, instead of using inheritance to create a class hierarchy, composition allows one object to contain other objects like part of their structure.

In the example below, inheritance can be used so that the Computer class inherits properties and methods from the CPU and GPU classes, but this would leave the code tightly coupled, the use of composition promotes code reuse in a more flexible and easier to maintain manner.
```js
class CPU {
  constructor ({ clock, cores, name }) {
    this.clock = clock
    this.cores = cores
    this.name = name
  }
  // cpu methods
}

class GPU {
  constructor ({ clock, name, vram }) {
    this.clock = clock
    this.name = name
    this.vram = vram
  }
  // gpu methods
}

class Computer {
  constructor ({ cpu, gpu, name }) {
    this.cpu = cpu
    this.gpu = gpu
    this.name = name
  }
  // computer methods
}

const i5 = new CPU({ clock: 3.5, cores: 14, name: 'Intel Core i5-13600K' })
const rtx = new GPU({ clock: 2.3, name: 'NVIDIA GeForce RTX 4060 Ti', vram: 8 })
const pc = new Computer({ cpu: i5, gpu: rtx, name: "Matthew's Computer" })

console.log(pc)
```