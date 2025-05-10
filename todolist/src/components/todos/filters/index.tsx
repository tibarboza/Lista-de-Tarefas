import { AppDispatch, RootState } from "@/app/store/store";
import {
  setData,
  setFilterBy,
  setEndDate,
  Todo,
  setInitialDate,
  clearFilters,
} from "@/app/store/todo/todoSlice";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Value } from "@radix-ui/react-select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function FilterTodos() {
  const state = useSelector((state: RootState) => state.todo);
  const dispatch: AppDispatch = useDispatch();

  const [inputChange, setInputChange] = useState<string>("");
  const [initialDateTemp, setInitialDateTemp] = useState<Date | undefined>(
    state.initialDate ? new Date(state.initialDate) : undefined
  );
  const [endDateTemp, setEndDateTemp] = useState<Date | undefined>(
    state.endDate ? new Date(state.endDate) : undefined
  );

  useEffect(() => {
    let filter: Todo[] = [];
    if (state.filterBy === "title") {
      filter = state.data.map((todo) => ({
        ...todo,
        isVisible: todo.title.toLowerCase().includes(inputChange.toLowerCase()),
      }));
    } else if (state.filterBy === "description") {
      filter = state.data.map((todo) => ({
        ...todo,
        isVisible: todo.description
          .toLowerCase()
          .includes(inputChange.toLowerCase()),
      }));
    }
  }, [inputChange]);

  useEffect(() => {
    dispatch(
      setInitialDate(initialDateTemp ? initialDateTemp.toDateString() : "")
    );
  }, [initialDateTemp]);

  useEffect(() => {
    dispatch(setEndDate(endDateTemp ? endDateTemp.toDateString() : ""));
  }, [endDateTemp]);

  // useEffect(() => {
  //   setInitialDateTemp(undefined);
  // }, [state.initialDate]);

  // useEffect(() => {
  //   setEndDateTemp(undefined);
  // }, [state.endDate]);

  return (
    <div className="w-full flex flex-row justify-center align-middle items-center m-5">
      <div className="flex flex-row gap-5 align-middle">
        <Input
          defaultValue={inputChange}
          onChange={(e) => setInputChange(e.target.value)}
          placeholder={`Filtrar por ${
            state.filterBy === "title" ? "título" : "descrição"
          }`}
        />
        <Select
          defaultValue={state.filterBy}
          onValueChange={(e) => dispatch(setFilterBy(e))}
        >
          <SelectTrigger></SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filtrar por</SelectLabel>
              <SelectItem value="title">Título</SelectItem>
              <SelectItem value="description">Descrição</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !initialDateTemp && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {initialDateTemp ? (
                  format(initialDateTemp, "PPP", { locale: ptBR })
                ) : (
                  <span>Data inicial</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(state.initialDate)}
                locale={ptBR}
                onSelect={(value) => setInitialDateTemp(value)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDateTemp && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {endDateTemp ? (
                  format(endDateTemp, "PPP", { locale: ptBR })
                ) : (
                  <span>Data final</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={ptBR}
                mode="single"
                selected={new Date(state.endDate)}
                onSelect={(value) => setEndDateTemp(value)}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button variant={"secondary"} onClick={() => dispatch(clearFilters())}>
          Limpar filtros
        </Button>
      </div>
    </div>
  );
}

export default FilterTodos;
