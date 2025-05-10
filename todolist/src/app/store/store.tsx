"use client";

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

// Utilizado mais para o TypeScript, para podermos acessar de qualquer componente o state
export type RootState = ReturnType<typeof store.getState>;

// Utilizado mais para o TypeScript, para podermos acessar de qualquer componente o dispatch
export type AppDispatch = typeof store.dispatch;
