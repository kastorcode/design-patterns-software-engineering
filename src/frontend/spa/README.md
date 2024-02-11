## SPA
Single Page Application is a design pattern for web application development in which the entire application is loaded on a single page and navigation between different sections is performed dynamically without reloading the entire page and only specific parts are updated as needed. Example using ReactJS frontend framework:
```html
<!-- index.html -->
<div id='app'></div>
<script src='app.js'></script>
```
```js
// app.js
import { useState } from 'react'
import { pages } from '~/pages'

function App () {
  const [page, setPage] = useState('Home')
  function navigate (page) {
    setPage(page)
  }
  return (
    <div>
      <nav>
        <button onClick={() => navigate('Home')}>Home</button>
        <button onClick={() => navigate('Profile')}>Profile</button>
      </nav>
      { pages.getPage(page) }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
```