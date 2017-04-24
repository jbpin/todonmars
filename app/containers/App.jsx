require('babel-polyfill');
import React from 'react';
import TodoItem from '../components/todoItem';
import TodoFooter from '../components/footer';
import todoStore from '../store/todoStore';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';
const ENTER_KEY = 13;

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: ''
    }, todoStore.getState() );
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    todoStore.changed.add(this._onChange);
  }

  _onChange(value) {
    this.setState({...value, newTodo: ''});
  }

  handleChange(event) {
    this.setState({newTodo: event.target.value,});
  }

  handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = this.state.newTodo.trim();

    if (val) {
      todoStore.add(val);
    }
  }

  toggleDisplay(mode) {
    this.setState({nowShowing: mode});
  }

  toggleAll(event) {
    var checked = event.target.checked;
    todoStore.toggleAll(checked);
  }

  toggle(id) {
    todoStore.toggle(id);
  }

  destroy(id) {
    todoStore.remove(id);
  }

  edit(id) {
    this.setState({ editing: id });
  }

  save(id, todo, text) {
    todoStore.update(id, {...todo, text});
    this.setState({editing: null});
  }

  cancel() {
    this.setState({editing: null});
  }

  clearCompleted() {
    todoStore.clearCompleted();
  }

  render() {
    var footer;
    var main;
    var todos = this.state.todos;

    var shownTodos = todos.filter(function (todo, index) {
      todo.id = index;
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    }, this);

    var todoItems = shownTodos.map( (todo) => {
      return (
        <TodoItem
          key={todo.id.toString()+todo.completed}
          todo={todo}
          onToggle={this.toggle.bind(this, todo.id)}
          onDestroy={this.destroy.bind(this, todo.id)}
          onEdit={this.edit.bind(this, todo.id)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo.id, todo)}
          onCancel={this.cancel.bind(this)}
        />
      );
    });

    var activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.clearCompleted.bind(this)}
          toggleDisplay={this.toggleDisplay.bind(this)}
        />;
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll.bind(this)}
            checked={activeTodoCount === 0}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
      );
  }
}