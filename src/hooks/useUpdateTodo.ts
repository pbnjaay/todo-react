import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddTodoContext } from "./useAddTodo";
import { CACHE_TODO_KEY } from "../constants";
import todoService, { Todo } from "../services/todoService";

const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    
    return useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: todoService.update,
    
        onMutate: (updatedTodo) => {
          const previousTodo = queryClient.getQueryData<Todo[]>(CACHE_TODO_KEY) || [];
    
          queryClient.setQueryData<Todo[]>(CACHE_TODO_KEY, (todos = []) =>
            todos.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo)
          );
    
          return { previousTodo };
        },
    
        onSuccess: (_data, updatedTodo, _context) => {
            queryClient.setQueryData<Todo[]>(CACHE_TODO_KEY, (todos = []) =>
            todos.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo)
          );
        },
    
        onError: (_error, _todo, context) => {
          if (!context) return;
          queryClient.setQueryData<Todo[]>(
            CACHE_TODO_KEY,
            context.previousTodo
          );
        },
      });    
}

export default useUpdateTodo;