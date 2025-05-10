import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "./todoSlice";

export const fetchTodos = createAsyncThunk(
  "fetchTodos",
  async (status: string) => {
    const response = await fetch(`http://localhost:8000/todos/${status}`);
    const data = await response.json();
    return data;
  }
);

export const addTodo = createAsyncThunk("addTodo", async (newTodo: Todo) => {
  const response = await fetch("http://localhost:8000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  const data = await response.json();
  return data;
});

export const updateTodo = createAsyncThunk(
  "updateTodo",
  async (updateTodo: Todo) => {
    const response = await fetch(`http://localhost:8000/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTodo),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteTodo = createAsyncThunk("deleteTodo", async (id: number) => {
  const response = await fetch(`http://localhost:8000/todo/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
});
