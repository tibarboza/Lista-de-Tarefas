"use client";

import TodoItem from "@/components/todo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import TodoForm from "./form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import {
  initialTodoState,
  setOpenDeleteModal,
  Todo,
} from "../store/todo/todoSlice";
// import { useTodos } from "../hooks/useTodos";
import { set } from "date-fns";
import { setOpenForm, onOpenChange } from "../store/todo/todoSlice";
import { todo } from "node:test";
import DeleteModal from "@/components/deleteModal";
import { setTab } from "@/app/store/todo/todoSlice";
import { deleteTodo, fetchTodos } from "../store/todo/action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import TabsTodos from "@/components/todos/tabs";
import FilterTodos from "@/components/todos/filters";

function TodoListPage() {
  const state = useSelector((state: RootState) => state.todo);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos(state.tab));
  }, [dispatch, state.tab]);

  useEffect(() => {
    console.log(`Alterou`);
  }, [state.data]);

  return (
    <div className="w-full h-full p-5">
      <div className="flex flex-row justify-center items-center gap-5 mb-5">
        <h1 className="text-2xl">Tarefas</h1>
        <Sheet
          open={state.openForm}
          onOpenChange={() => {
            dispatch(onOpenChange(!state.openForm));
          }}
        >
          <SheetTrigger
            className="absolute top-5 right-5"
            onClick={() => {
              dispatch(
                setOpenForm({
                  action: "Add",
                  selectedTodo: initialTodoState,
                  openForm: true,
                })
              );
            }}
            asChild
          >
            <Plus />
          </SheetTrigger>
          <TodoForm />
        </Sheet>
      </div>
      <FilterTodos />

      <TabsTodos />
      <div className="flex flex-col items-center gap-5">
        {state.data
          .filter((value: Todo) => {
            const todoDate = new Date(value.dtCreate);
            const initialDate = state.initialDate
              ? new Date(state.initialDate)
              : undefined;
            const endDate = state.endDate ? new Date(state.endDate) : undefined;

            if (initialDate && endDate) {
              return (
                value.isVisible &&
                todoDate >= initialDate &&
                todoDate <= endDate
              );
            } else if (initialDate) {
              return value.isVisible && todoDate >= initialDate;
            } else if (endDate) {
              return value.isVisible && todoDate <= endDate;
            }

            return value.isVisible;
          })
          .map((value: Todo, index: number) => (
            <TodoItem key={index} todo={value} />
          ))}
      </div>
      <DeleteModal
        open={state.openDeleteModal}
        title="Têm certeza que deseja deletar a tarefa?"
        description={`Ao deletar a terafa ${state.selectedTodo?.title} ela será apagada definitivamente da base de dados!!!`}
        onOpenChange={() =>
          dispatch(
            setOpenDeleteModal({
              selectedTodo: initialTodoState,
              openDeleteModal: !state.openDeleteModal,
            })
          )
        }
        deleteFunction={() =>
          dispatch(deleteTodo(state.selectedTodo?.id as number))
        }
      />
    </div>
  );
}

export default TodoListPage;
