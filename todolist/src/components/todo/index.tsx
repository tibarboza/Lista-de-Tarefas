"use client";

import { Check, Clock8, Eye, Pencil, TimerOff, Trash2 } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { BtnActionTodo, SeparatorTodo } from "./style";
import {
  setOpenDeleteModal,
  setOpenForm,
  Todo,
} from "@/app/store/todo/todoSlice";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { MotionConfig } from "framer-motion";
import { RootState } from "@/app/store/store";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const state = useSelector((state: RootState) => state.todo);

  const dispatch = useDispatch();

  console.log(state.data);

  return (
    <motion.div
      className="flex flex-row align-middle items-center gap-4 rounded w-[70vw] p-5 bg-emerald-950 hover:bg-emerald-800 transition-colors duration-300 rounded-lg p-4"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "10px" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <section className="w-[50vw]">
        <h3 className="font-bold text-left">{todo.title}</h3>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {todo.description}
        </p>
      </section>
      <SeparatorTodo orientation="vertical" />
      <section className="flex flex-col">
        <h4>Status</h4>
        <p className="self-center">
          {todo.status == "C" ? (
            <Check color="green" />
          ) : todo.status == "A" ? (
            <Clock8 color="orange" />
          ) : (
            <TimerOff color="red" />
          )}
        </p>
      </section>
      <SeparatorTodo orientation="vertical" />
      <section className="flex flex-row gap-4">
        <div>
          <h4>Criação</h4>
          <p>{format(todo.dtCreate, "dd/MM/yyyy", { locale: ptBR })}</p>
        </div>
        <div>
          <h4>Alteração</h4>
          <p>{format(todo.dtChange, "dd/MM/yyyy", { locale: ptBR })}</p>
        </div>
      </section>
      <section></section>
      <SeparatorTodo orientation="vertical" />
      <section className="flex flex-row gap-2">
        <BtnActionTodo
          onClick={() =>
            dispatch(
              setOpenDeleteModal({
                openDeleteModal: !state.openDeleteModal,
                selectedTodo: todo,
              })
            )
          }
        >
          <Trash2 color="red" />
        </BtnActionTodo>
        <BtnActionTodo
          onClick={() =>
            dispatch(
              setOpenForm({
                action: "Update",
                selectedTodo: todo,
                openForm: true,
              })
            )
          }
        >
          <Pencil color="orange" />
        </BtnActionTodo>
        <BtnActionTodo
          onClick={() =>
            dispatch(
              setOpenForm({
                action: "View",
                selectedTodo: todo,
                openForm: true,
              })
            )
          }
        >
          <Eye color="green" />
        </BtnActionTodo>
      </section>
    </motion.div>
  );
}

export default TodoItem;
