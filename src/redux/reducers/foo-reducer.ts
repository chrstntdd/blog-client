import { ADD_TODO, MOVE_UP, REMOVE_TODO } from '../actions/types';
const INITIAL_STATE = {
  visibilityFilter: 'all',
  todos: [
    {
      text: 'succ',
      id: 0
    },
    {
      text: 'fucc',
      id: 1
    },
    {
      text: 'hyucc',
      id: 2
    },
    {
      text: 'nucc',
      id: 3
    }
  ]
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    }
    case REMOVE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    }

    case MOVE_UP: {
      const reverseSlice = state.todos
        .slice(action.payload - 1, action.payload + 1)
        .reverse();

      if (action.payload === 0) {
        /* at the top of the list */
        return {
          ...state
        };
      } else if (action.payload + 1 >= state.todos.length) {
        /* at the end of the list */
        return {
          ...state,
          todos: state.todos.slice(0, action.payload - 1).concat(reverseSlice)
        };
      } else if (action.payload === 1) {
        /* at the second item in the list */
        return {
          ...state,
          todos: reverseSlice.concat(state.todos.slice(action.payload + 1))
        };
      } else {
        /* between the start and end */
        return {
          ...state,
          todos: state.todos
            .slice(0, action.payload - 1)
            .concat(reverseSlice, state.todos.slice(action.payload + 1))
        };
      }
    }
    default:
      return state;
  }
}
