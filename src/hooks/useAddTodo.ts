import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_TODO_KEY } from "../constants";
import todoService, { Todo } from "../services/todoService";

export interface AddTodoContext {
    previousTodo: Todo[];
  }
  
const useAddTodo = () => {
    const queryClient = useQueryClient();

    return useMutation<Todo, Error, Todo, AddTodoContext>({
      mutationFn: todoService.post,
  
      onMutate: (newTodo) => {
        const previousTodo = queryClient.getQueryData<Todo[]>(CACHE_TODO_KEY) || [];
  
        queryClient.setQueryData<Todo[]>(CACHE_TODO_KEY, (todos = []) => [
          newTodo,
          ...todos,
        ]);
  
        return { previousTodo };
      },
  
      onSuccess: (savedTodo, newTodo) => {
        queryClient.setQueryData<Todo[]>(CACHE_TODO_KEY, (todos) =>
          todos?.map((todo) => (todo == newTodo ? savedTodo : todo))
        );
      },
      onError: (_error, _newTodo, context) => {
        if (!context) return;
        queryClient.setQueryData<Todo[]>(CACHE_TODO_KEY, context.previousTodo);
      },
    });
}

export default useAddTodo