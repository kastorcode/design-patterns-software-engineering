## Middleware
Functions used to perform intermediate operations before a request reaches its final route or after a response is generated, useful for performing tasks such as data validation, authentication, authorization, among others.
```js
function App () {
  const middlewares = []
  function use (middleware) {
    middlewares.push(middleware)
  }
  function runMiddlewares (request, response) {
    function run (index) {
      if (index < middlewares.length) {
        const middleware = middlewares[index]
        middleware(request, response, function () {
          run(index + 1)
        })
      }
    }
    run(0)
  }
  function getParams (path) {
    const [_, feature, entity, id] = path.split('/')
    return { feature, entity, id: Number(id) }
  }
  function get (path, callback) {
    const request = {
      method: 'GET',
      params: getParams(path),
      path
    }
    const response = {
      send: (data) => console.log(data),
      error: (error) => {
        callback = null
        console.log(error)
      }
    }
    runMiddlewares(request, response)
    callback && callback(request, response)
  }
  return {
    use,
    get
  }
}

function logTimeMiddleware (request, response, next) {
  console.log(`[${new Date()}]\n${request.path}`)
  next()
}

function validateIdMiddleware (request, response, next) {
  const id = request.params && request.params.id
  if (id) {
    next()
  }
  else {
    response.error('invalid id')
  }
}

function mockRequest (path) {
  app.get(path, (request, response) => {
    const id = request.params.id
    response.send(`User: ${id}\n`)
  })
}

const app = App()

app.use(logTimeMiddleware)
app.use(validateIdMiddleware)

mockRequest('/api/users/150')
mockRequest('/api/users/ABC')
```