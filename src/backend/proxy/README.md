## Proxy
Structural pattern that provides a substitute or intermediary (hook) for another object, controlling access to it. It is useful for adding extra functionality to the original object without changing its code.
```js
// Object-in-the-Middle proxy example

const database = {
  computer: 1000,
  notebook: 1250,
  smartphone: 700,
  tablet: 750
}

function mockWaiting () {
  return new Promise(resolve => setTimeout(() => resolve(), Math.random() * (2000 - 1000) + 1000))
}

class ProductsAPI {
  async getProductPrice ({ product }) {
    await mockWaiting()
    if (!database[product]) {
      throw new Error('404')
    }
    return database[product]
  }
}

class ProductsApiProxy {
  constructor () {
    this.cache = {}
    this.productsAPI = new ProductsAPI()
  }
  async getProductPrice ({ product }) {
    if (!this.cache[product]) {
      this.cache[product] = await this.productsAPI.getProductPrice({ product })
    }
    return this.cache[product]
  }
}

async function mockRequests () {
  async function printProductsPrice (productsApiProxy) {
    const TIME = 'time'
    console.time(TIME)
    console.log(`Computer: $${await productsApiProxy.getProductPrice({ product: 'computer' })}`)
    console.log(`Notebook: $${await productsApiProxy.getProductPrice({ product: 'notebook' })}`)
    console.log(`Smartphone: $${await productsApiProxy.getProductPrice({ product: 'smartphone' })}`)
    console.log(`Tablet: $${await productsApiProxy.getProductPrice({ product: 'tablet' })}`)
    console.timeEnd(TIME)
    console.log('\n')
  }
  const productsApiProxy = new ProductsApiProxy()
  console.log('\t// Object-in-the-Middle proxy example\n')
  console.log('WITHOUT CACHE')
  await printProductsPrice(productsApiProxy)
  console.log('WITH CACHE')
  await printProductsPrice(productsApiProxy)
}

await mockRequests()

// Proxy example with the JavaScript Proxy object

const dbProxyHandler = {
  get (database, product) {
    if (!database[product]) {
      throw new Error('404')
    }
    return `${product}: $${database[product]}`
  },
  set (database, product, price) {
    const { length } = product
    if (length < 2 || length > 32) {
      throw new Error('invalid product name')
    }
    if (typeof price !== 'number' || price < 1 || price > 10000) {
      throw new Error('invalid product price')
    }
    database[product] = price
    return true
  }
}

const dbProxy = new Proxy(database, dbProxyHandler)
dbProxy['monitor'] = 625

console.log('\t// Proxy example with the JavaScript Proxy object\n')
Object.keys(dbProxy).forEach(product => console.log(dbProxy[product]))
```