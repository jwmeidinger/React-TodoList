// Allows for side logic such as requests.

import {
  loadTodosFailure,
  loadTodosInProgress,
  loadTodosSuccess,
  createTodo,
  removeTodo,
  completeTodo
} from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch("https://5u7f2.sse.codesandbox.io/todos");
    const todos = await response.json();

    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};

export const addTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch("https://5u7f2.sse.codesandbox.io/todos", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body
    });
    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://5u7f2.sse.codesandbox.io/todos/${id}`,
      {
        method: "delete"
      }
    );
    const removedTodo = await response.json();
    dispatch(removeTodo(removedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const updateTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://5u7f2.sse.codesandbox.io/todos/${id}/completed`,
      {
        method: "post"
      }
    );
    const updatedTodo = await response.json();
    dispatch(completeTodo(updatedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const displayAlert = (text) => () => {
  alert(text);
};
