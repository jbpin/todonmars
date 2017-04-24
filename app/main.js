import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import todoStore from './store/todoStore';

// require('./App.css');
require('todomvc-common/base.css');
require('todomvc-app-css/index.css');

export function initialize(div, data = null) {
  if(data) {
    todoStore.init(data);
  }

  ReactDOM.render(
    <App />,
    div
  );
}

export function addDataHandler(handler) {
  todoStore.changed.add((value)=>{
    handler(value.todos);
  });
}

export function getData() {
  return todoStore.getState().todos;
}