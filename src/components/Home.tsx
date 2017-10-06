import {
  addTodo,
  removeTodo,
  showGreeting,
  moveUp,
  moveDown
} from '../redux/actions/actions';
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import Header from './Header';

import styles from './home.scss';

interface PropTypes {
  showGreeting: Function;
  addTodo: Function;
  removeTodo: Function;
  moveUp: Function;
  moveDown: Function;
}
interface StateType {}

export class Home extends Component<PropTypes, StateType> {
  componentWillMount() {
    this.props.showGreeting('hello on mount!');
  }

  handleSubmit(e) {
    const inputVal = e.srcElement[0].value;
    e.preventDefault();
    this.props.addTodo(inputVal);
    document.getElementById('todo-form').reset();
  }

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

  render({ todos, message }) {
    return (
      <section class={styles.homePage} id="home-page">
        <Header />
        <div class={styles.otherStuff}>
          <h1>HOME PAGE</h1>
          <h4>{message}</h4>
          <form
            id="todo-form"
            onSubmit={e => this.handleSubmit(e)}
            action="javascript:"
          >
            <input type="text" placeholder="new todo" />
          </form>
          <ul>
            {todos.map((todo, i) => (
              <li id={todo.id}>
                <p>{todo.text}</p>
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
})(Home);
