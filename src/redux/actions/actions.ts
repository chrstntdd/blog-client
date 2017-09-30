import { ADD_TODO, REMOVE_TODO, SHOW_GREETING } from './types';

export const addTodo = text => (dispatch, getState) => {
  const state = getState();
  dispatch({ type: ADD_TODO, payload: { text, id: state.foo.todos.length } });
};

export const removeTodo = id => dispatch => {
  dispatch({ type: REMOVE_TODO, payload: id });
};

export const showGreeting = text => dispatch => {
  dispatch({ type: SHOW_GREETING, payload: text });
};
