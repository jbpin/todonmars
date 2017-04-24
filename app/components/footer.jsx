import React from 'react';
import classNames from 'classnames';

export default class TodoFooter extends React.Component {

  render() {
    // var activeTodoWord = app.Utils.pluralize(this.props.count, 'item');
    var activeTodoWord = 'item';
    var clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}>
            Clear completed
        </button>
        );
    }

    var nowShowing = this.props.nowShowing;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <a
              onClick={() => this.props.toggleDisplay('all')}
              className={classNames({selected: nowShowing === 'all'})}>
                All
            </a>
          </li>
          {' '}
          <li>
            <a
              onClick={() => this.props.toggleDisplay('active')}
              className={classNames({selected: nowShowing === 'active'})}>
                Active
            </a>
          </li>
          {' '}
          <li>
            <a
              onClick={()=> this.props.toggleDisplay('completed')}
              className={classNames({selected: nowShowing === 'completed'})}>
                Completed
            </a>
        </li>
      </ul>
      {clearButton}
    </footer>);
  }
}