## Flux
State management architecture developed by Facebook for web applications, consists of four parts: Actions, Dispatcher, Stores and Views, designed to handle data flow in a unidirectional manner.

## Actions
Represent events that occur in the application, they are payloads of information that are sent to the Dispatcher.

## Dispatcher
Responsible for dispatching actions to registered Stores, ensuring that actions are handled in the order in which they were dispatched.

## Stores
Responsible for managing the application state and responding to actions dispatched by the Dispatcher, they emit a change event whenever the state changes.

## Views
Components that display the application state, they register with Stores and are updated when the state changes.
```js
// Actions
function addTodoAction (todo) {
  return { type: 'ADD_TODO', todo }
}
function completeTodoAction (index) {
  return { type: 'COMPLETE_TODO', index }
}

// Dispatcher
class Dispatcher {
  constructor () {
    this.stores = []
  }
  register (store) {
    this.stores.push(store)
  }
  dispatch (action) {
    this.stores.forEach(store => store.handleActions(action))
  }
}

// Store
class TodoStore {
  constructor () {
    this.list = []
    this.listeners = []
  }
  getTodoList () {
    return this.list
  }
  on (event, listener) {
    this.listeners.push({ event, listener })
  }
  emitChange () {
    this.listeners.forEach(({ event, listener }) => {
      if (event === 'change') listener()
    })
  }
  handleActions (action) {
    switch (action.type) {
      case 'ADD_TODO':
        this.list.push({ todo: action.todo, completed: false })
        this.emitChange()
        break
      case 'COMPLETE_TODO':
        this.list[action.index].completed = true
        this.emitChange()
        break
    }
  }
}

// View
class View {
  static update (todoStore) {
    View.render(todoStore.getTodoList())
  }
  static render (todoList) {
    console.clear()
    console.log('***** TO DO LIST *****')
    todoList.forEach(({ todo, completed }) => console.log(`[${completed ? 'x' : ' '}]`, todo))
    console.log('**********************')
  }
}

// Implementation
const dispatcher = new Dispatcher()
const todoStore = new TodoStore()

dispatcher.register(todoStore)
todoStore.on('change', () => View.update(todoStore))

dispatcher.dispatch(addTodoAction('Read React documentation'))
dispatcher.dispatch(addTodoAction('Read Redux documentation'))
dispatcher.dispatch(addTodoAction('Remember Clean Architecture concepts'))
dispatcher.dispatch(completeTodoAction(0))
```