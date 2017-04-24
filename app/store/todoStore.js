import { Store, Command } from 'sinux';

const todoStore = new Store({todos:[]},
  'init',
  'add',
  'remove',
  'update',
  'toggle',
  'toggleAll',
  'clearCompleted',
);

// commands
new Command(todoStore.init, (state, todos) => {
  return {...state, todos}
});

new Command(todoStore.add, (state, todo) => {
  return {...state, todos : [...state.todos, {text: todo, completed: false}]}
});
new Command(todoStore.remove, (state, id) => {
  return {...state, todos : [...state.todos.slice(0, id), ...state.todos.slice(id + 1)]}
});
new Command(todoStore.update, (state, id, todo) => {
  return {...state, todos : [...state.todos.slice(0, id), {...todo}, ...state.todos.slice(id + 1)]}
});
new Command(todoStore.toggle, (state, id) => {
  let todo = {...state.todos[id]}
  todo.completed = !todo.completed;
  return {...state, todos : [...state.todos.slice(0, id), {...todo}, ...state.todos.slice(id + 1)]}
});

new Command(todoStore.toggleAll, (state, completed) => {
  return {...state, todos: state.todos.map((todo) => {todo.completed = completed; return todo})};
})

new Command(todoStore.clearCompleted, (state) => {
  return {...state, todos: state.todos.filter((todo) => !todo.completed), };
})



export default todoStore;