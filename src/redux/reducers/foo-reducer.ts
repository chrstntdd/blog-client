import { ADD_TODO, REMOVE_TODO } from '../actions/types';
const INITIAL_STATE = {
  visibilityFilter: 'all',
  todos: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    }
    case REMOVE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== Number(action.payload)),
      };
    }
    default:
      return state;
  }
}
