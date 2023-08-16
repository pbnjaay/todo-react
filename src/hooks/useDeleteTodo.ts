import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddTodoContext } from "./useAddTodo";
import { CACHE_TODO_KEY } from "../constants";
import todoService, { Todo } from "../services/todoService";

const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    
    return useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: todoService.delete,
    
        onMutate: (deletedTodo) => {
          const previousTodo = queryClient.getQueryData<Todo[]>(CACHE_TODO_KEY) || [];
    
          queryClient.setQueryData<Todo[]>(CACHE_TODO_KEY, (todos = []) =>
            todos.filter((todo) => todo.id !== deletedTodo.id)
          );
    
          return { previousTodo };
        },
    
        onSuccess: (_data, deletedTodo, _context) => {
          queryClient.setQueryData<Todo[]>(
CACHE_TODO_KEY, (todos = []) => todos.filter((todo) => todo.id !== deletedTodo.id)
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

export default useDeleteTodo;