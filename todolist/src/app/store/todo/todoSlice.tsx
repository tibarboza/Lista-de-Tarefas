"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { addTodo, fetchTodos, updateTodo, deleteTodo } from "./action";
import { toast } from "react-toastify";

// Begin Todo Object
export interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  dtCreate: string;
  dtChange: string;
  isVisible: boolean;
}

export const initialTodoState: Todo = {
  id: 0,
  title: "",
  description: "",
  status: "P",
  dtCreate: new Date().toISOString(),
  dtChange: new Date().toISOString(),
  isVisible: true,
};

// End Todo Object

// Begin Todos State
interface TodoState {
  tab: string;
  data: Todo[];
  action: string;
  openForm: boolean;
  filterBy: string;
  isLoading: boolean;
  selectedTodo: Todo;
  openDeleteModal: boolean;
  initialDate: string;
  endDate: string;
}

const initialState: TodoState = {
  tab: "P",
  data: [],
  isLoading: false,
  action: "",
  filterBy: "title",
  selectedTodo: initialTodoState,
  openForm: false,
  openDeleteModal: false,
  initialDate: "",
  endDate: "",
};

// End Todos State

// Begin Interface to Open Form and Delete Modal
interface openForm {
  action: string;
  selectedTodo: Todo;
  openForm: boolean;
}

interface openDeleteModal {
  openDeleteModal: boolean;
  selectedTodo: Todo;
}

// End Interface to Open Form and Delete Modal

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    clearFilters: (state) => {
      state.filterBy = "";
      state.initialDate = "";
      state.endDate = "";
    },
    setInitialDate: (state, action: PayloadAction<string>) => {
      state.initialDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setFilterBy: (state, action: PayloadAction<string>) => {
      state.filterBy = action.payload;
    },
    setData: (state, action: PayloadAction<Todo[]>) => {
      state.data = action.payload;
    },
    setTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
    },
    setAction: (state, action: PayloadAction<string>) => {
      state.action = action.payload;
    },
    setOpenForm: (state, action: PayloadAction<openForm>) => {
      console.log(action);
      state.selectedTodo = action.payload.selectedTodo;
      state.action = action.payload.action;
      state.openForm = action.payload.openForm;
    },
    setOpenDeleteModal: (state, action: PayloadAction<openDeleteModal>) => {
      state.selectedTodo = action.payload.selectedTodo;
      state.openDeleteModal = action.payload.openDeleteModal;
    },
    onOpenChange: (state, action: PayloadAction<boolean>) => {
      state.selectedTodo = initialTodoState;
      state.openForm = action.payload;
    },
    setSelectedTodo: (state, action: PayloadAction<Todo>) => {
      state.selectedTodo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get Todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
      state.data = [];
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      const data = action.payload.map((todo: Todo) => ({
        ...todo,
        isVisible: true,
      }));
      state.isLoading = false;
      state.data = data;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.isLoading = false;
      state.data = [];
      toast.error("Erro ao carregar as tarefas");
    });

    // Add Todo
    builder.addCase(addTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
      state.openForm = false;
      state.selectedTodo = initialTodoState;
      toast.success("A tarefa foi adicionada com sucesso");
    });
    builder.addCase(addTodo.rejected, (state) => {
      state.isLoading = false;
      toast.error("Erro ao adicionar a tarefa");
    });

    // Update Todo
    builder.addCase(updateTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      state.openForm = false;
      state.selectedTodo = initialTodoState;
      toast.success("A tarefa foi alterada com sucesso");
    });
    builder.addCase(updateTodo.rejected, (state) => {
      state.isLoading = false;
      toast.error("Erro ao alterar a tarefa");
    });

    // Delete Todo
    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.data = state.data.filter((todo) => todo.id !== action.payload);
      state.openDeleteModal = false;
      state.selectedTodo = initialTodoState;
      toast.success("A tarefa foi deletada com sucesso");
    });
    builder.addCase(deleteTodo.rejected, (state) => {
      state.isLoading = false;
      toast.error("Erro ao deletar a tarefa");
    });
  },
});

export const {
  setAction,
  setOpenForm,
  setOpenDeleteModal,
  onOpenChange,
  setSelectedTodo,
  setTab,
  setData,
  setFilterBy,
  setInitialDate,
  setEndDate,
  clearFilters,
} = todoSlice.actions;

export default todoSlice.reducer;
