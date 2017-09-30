import { addTodo, removeTodo, showGreeting } from '../redux/actions/actions';
import { h, Component } from 'preact';
import { connect } from 'preact-redux';

interface PropTypes {
  showGreeting: Function;
  addTodo: Function;
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
    this.props.removeTodo(todoId)
  }

  render({todos, message}) {
    return (
      <section>
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
              {todo.text}
              <button onClick={e => this.handleRemove(e)}>-</button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  message: state.bar.message,
  todos: state.foo.todos,
});

export default connect(mapStateToProps, { addTodo, removeTodo, showGreeting })(
  Home
);