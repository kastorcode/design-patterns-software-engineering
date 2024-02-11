## SSR
Server-Side Rendering is a design pattern where web pages are rendered on the server before being sent to the client browser. SSR example using NodeJS, Express and Embedded JavaScript Templates:
```js
// server.js
import express from 'express'
import ejs from 'ejs'

const port = 3000
const app = express()

app.set('view engine', 'ejs')

app.get('/', (request, response) => {
  const data = {
    title: 'SSR Sample',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
  response.render('index', { data })
})

app.listen(port, () => {
  console.log(`SSR listening at http://localhost:${port}`)
})
```
```html
<!-- /views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title><%= data.title %></title>
</head>
<body>
  <h1><%= data.title %></h1>
  <p><%= data.content %></p>
</body>
</html>
```