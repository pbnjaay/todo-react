import { useQuery } from "@tanstack/react-query";
import { CACHE_TODO_KEY } from "../constants";
import todoService, { Todo } from "../services/todoService";


const useTodos = () => 

     useQuery<Todo[], Error>({
        queryKey: CACHE_TODO_KEY,
        queryFn: todoService.getall,
        staleTime: 10 * 1000,
        keepPreviousData: true,
      });


export default useTodos;