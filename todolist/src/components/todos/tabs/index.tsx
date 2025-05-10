import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../ui/button";
import { AppDispatch, RootState } from "@/app/store/store";
import { setTab } from "@/app/store/todo/todoSlice";

function TabsTodos() {
  const state = useSelector((state: RootState) => state.todo);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex flex-row justify-center items-center gap-5 mb-5">
      <Button
        onClick={() => dispatch(setTab("P"))}
        variant={state.tab === "P" ? "default" : "outline"}
      >
        Pendente
      </Button>
      <Button
        onClick={() => dispatch(setTab("A"))}
        variant={state.tab === "A" ? "default" : "outline"}
      >
        Andamento
      </Button>
      <Button
        onClick={() => dispatch(setTab("C"))}
        variant={state.tab === "C" ? "default" : "outline"}
      >
        Concluída
      </Button>
    </div>
  );
}

export default TabsTodos;
