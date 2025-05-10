import { AppDispatch, RootState } from "@/app/store/store";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormElement from "@/components/form/formElement";
import { TodoSchema } from "./schema";
import { initialTodoState, Todo } from "@/app/store/todo/todoSlice";
import FormDateElement from "@/components/form/formDateElement";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import "./styles.css";
import { Button } from "@/components/ui/button";
import { addTodo, updateTodo } from "@/app/store/todo/action";
import { memo, useCallback, useEffect } from "react";

const titles = {
  Add: "Adicionar Tarefa",
  Update: "Atualizar Tarefa",
  View: "Visualizar Tarefa",
};

function TodoForm() {
  const dispatch: AppDispatch = useDispatch();
  const todosState = useSelector((state: RootState) => state.todo);

  const form = useForm({
    resolver: zodResolver(TodoSchema),
    values: todosState.selectedTodo || initialTodoState,
  });

  useEffect(() => {
    if (!todosState.openForm) {
      form.reset(initialTodoState);
    }
  }, [todosState.openForm]);

  const handleSave = useCallback(
    (todo: Todo) => {
      if (todosState.action == "Add") {
        dispatch(addTodo(todo));
      } else if (todosState.action == "Update") {
        dispatch(updateTodo(todo));
      }
    },
    [dispatch, todosState.action]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSave(form.getValues());
    },
    [form, handleSave]
  );

  return (
    <SheetContent className="p-5">
      <SheetTitle className="text-center">
        {titles[todosState.action as keyof typeof titles]}
      </SheetTitle>
      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <FormElement
            name="title"
            label="Título"
            control={form.control}
            disabled={todosState.action == "View" ? true : false}
          />
          <FormElement
            label="Descrição"
            name="description"
            control={form.control}
            disabled={todosState.action == "View" ? true : false}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }: any) => {
              return (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl {...field}>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={
                        todosState.action == "Add" ? "P" : field.value
                      }
                      // disabled={todosState.action == "Update" ? false : true}
                      {...field}
                    >
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="P" id="r1" />
                        </FormControl>
                        <Label htmlFor="r1">Pendente</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="A" id="r2" />
                        </FormControl>
                        <Label htmlFor="r2">Andamento</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="C" id="r3" />
                        </FormControl>
                        <Label htmlFor="r3">Concluída</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <div className="flex flex-col gap-2">
            <span>Status</span>
          </div>
          <div className="flex flex-row gap-1">
            <FormDateElement
              label="Criação"
              name="dtCreate"
              disabled={true}
              buttonClassName="w-auto"
              control={form.control}
            />
            <FormDateElement
              name="dtChange"
              disabled={true}
              label="Alteração"
              buttonClassName="w-auto"
              control={form.control}
            />
          </div>
          <Button
            type="submit"
            variant={"default"}
            className={`${
              todosState.action == "View" ? "hidden" : "visible"
            } bg-green-500`}
          >
            Salvar
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
}

export default memo(TodoForm);
