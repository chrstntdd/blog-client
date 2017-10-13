import * as React from 'react';
import {
  addTodo,
  removeTodo,
  showGreeting,
  moveUp,
  moveDown
} from '../redux/actions/actions';
import { connect } from 'react-redux';
import Header from '../components/Header';

import styles from '../components/home.scss';

interface Todo {
  text: String;
  id: Number;
}

interface PropTypes {
  showGreeting: Function;
  addTodo: Function;
  removeTodo: Function;
  moveUp: Function;
  moveDown: Function;
  message?: String;
  todos?: [Todo];
}
interface StateType {}

export class HomePage extends React.Component<PropTypes, StateType> {
  componentWillMount() {
    this.props.showGreeting('hello on mount!');
  }

  handleSubmit = e => {
    e.preventDefault();
    const inputVal = this.input.value;
    this.props.addTodo(inputVal);
    document.getElementById('todo-form').reset();
  };

  handleRemove(e) {
    const todoId = e.target.parentElement.id;
    this.props.removeTodo(todoId);
  }

  moveUp(index) {
    this.props.moveUp(index);
  }

  moveDown(index) {
    this.props.moveDown(index);
  }

  render() {
    const { todos, message } = this.props;
    return (
      <section className={styles.homePage} id="home-page">
        <Header />
        <div className={styles.otherStuff}>
          <h1>HOME PAGE</h1>
          <h4>{message}</h4>
          <form id="todo-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="new todo"
              ref={element => {
                this.input = element;
              }}
            />
          </form>
          <ul>
            {todos.map(({ text, id }, i) => (
              <li key={i} id={id.toString()}>
                <p>{text}</p>
                <button onClick={e => this.handleRemove(e)}>-</button>
                <button onClick={e => this.moveUp(i)}>^</button>
                <button onClick={e => this.moveDown(i)}>v</button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  message: state.bar.message,
  todos: state.foo.todos
});

export default connect(mapStateToProps, {
  addTodo,
  removeTodo,
  showGreeting,
  moveUp,
  moveDown
})(HomePage);
