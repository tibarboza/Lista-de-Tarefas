// "use client";

// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   UseQueryResult,
// } from "@tanstack/react-query";
// import { Todo } from "../store/todo/todoSlice";
// import axios from "axios";
// import { RootState } from "../store/store";
// import { useSelector } from "react-redux";
// import { format } from "date-fns";
// import { toast } from "react-toastify";
// import { ptBR } from "date-fns/locale";

// export function useTodos() {
//   const queryClient = useQueryClient();

//   const fetchTodos = async (): Promise<Todo[]> => {
//     const response = await axios.get("http://localhost:8000/todos", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   };

//   const getTodos: UseQueryResult<Todo[], Error> = useQuery({
//     queryKey: ["todos"],
//     queryFn: fetchTodos,
//     refetchOnWindowFocus: false, // Disable refetching on window focus
//   });

//   const addTodoMutation = useMutation({
//     mutationFn: async (newTodo: Todo) => {
//       const response = await axios.post("http://localhost:8000/todo", newTodo);
//       return response.data;
//     },
//     onSuccess: (newTodo: Todo) => {
//       queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => [
//         ...(oldTodos || []),
//         newTodo,
//       ]);
//       toast("A tarefa foi criada com sucesso");
//     },
//   });

//   const updateTodoMutation = useMutation({
//     mutationFn: async (updateTodo: Todo) => {
//       const response = await axios.put(
//         `http://localhost:8000/todo`,
//         updateTodo
//       );
//       return response.data;
//     },
//     onSuccess: (updatedTodo: Todo) => {
//       // queryClient.invalidateQueries({ queryKey: ["todos"] });
//       queryClient.setQueryData<Todo[]>(
//         ["todos"],
//         (oldTodos) =>
//           oldTodos?.map((todo) =>
//             todo.id === updatedTodo.id ? updatedTodo : todo
//           ) || []
//       );
//       toast("A tarefa foi alterada com sucesso");
//     },
//     onError: (error) => {},
//   });

//   const deleteTodoMutation = useMutation({
//     mutationFn: async (id: number) => {
//       const response = await axios.delete(`http://localhost:8000/todo/${id}`);
//       return response.data;
//     },
//     onSuccess: (idDeletedTodo: number) => {
//       queryClient.setQueryData<Todo[]>(
//         ["todos"],
//         (oldTodos) =>
//           oldTodos?.filter((todo) => todo.id !== idDeletedTodo) || []
//       );
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//       // toast.success("A tarefa foi deletada com sucesso");
//     },
//   });

//   return {
//     getTodos,
//     addTodoMutation,
//     deleteTodoMutation,
//     updateTodoMutation,
//   };
// }
