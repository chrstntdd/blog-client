import {
  ADD_TODO,
  MOVE_DOWN,
  MOVE_UP,
  REMOVE_TODO,
  SHOW_GREETING
} from './types';

export const addTodo = text => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: ADD_TODO,
    payload: { text, id: Number(state.foo.todos.length) }
  });
};

export const removeTodo = id => dispatch => {
  dispatch({ type: REMOVE_TODO, payload: id });
};

export const showGreeting = text => dispatch => {
  dispatch({ type: SHOW_GREETING, payload: text });
};

export const moveUp = index => (dispatch, getState) => {
  dispatch({ type: MOVE_UP, payload: Number(index) });
};

export const moveDown = index => dispatch => {
  dispatch({ type: MOVE_DOWN, payload: Number(index) });
};
