import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  RiDeleteBinLine,
  RiCheckFill,
  RiCheckDoubleLine,
} from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo, todoSchema } from "../services/todoService";
import useUpdateTodo from "../hooks/useUpdateTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";

interface Props {
  todo: Todo;
}

const Item = ({ todo }: Props) => {
  const [edit, setEdit] = useState(false);
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Todo>({
    resolver: zodResolver(todoSchema),
  });

  const completeTodo = () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodo.mutate(updatedTodo);
  };

  const addTodo = (data: Todo) => {
    const newTodo = { ...todo, title: data.title };
    updateTodo.mutate(newTodo);
    setEdit(false);
    reset();
  };

  return (
    <>
      {!edit && (
        <div className="flex justify-between items-center mt-1 bg-gray-200 p-2 h-12 rounded-md">
          <div className="flex-grow" onClick={() => setEdit(true)}>
            {todo.title}
          </div>
          <div className="flex space-x-0">
            {todo.completed ? (
              <button
                onClick={completeTodo}
                className="text-blue-400 px-3 py-1 bg-gray-200 rounded-md"
              >
                <RiCheckDoubleLine />
              </button>
            ) : (
              <button
                className="text-gray-400 p-3 bg-gray-200 rounded-sm -ml-10"
                type="submit"
                onClick={completeTodo}
              >
                <RiCheckFill />
              </button>
            )}
            <button
              onClick={() => deleteTodo.mutate(todo)}
              className="text-red-500 px-3 py-1 bg-gray-200 rounded-sm"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        </div>
      )}
      {edit && (
        <form onSubmit={handleSubmit(addTodo)} className="flex flex-wrap mt-1">
          <input
            type="text"
            id="title"
            className="outline-none border-2 p-2 flex-grow border-gray-200 rounded-sm"
            defaultValue={todo.title}
            autoFocus
            {...register("title")}
          />
          <button
            className="text-blue-500 p-3 bg-gray-200 rounded-sm -ml-10"
            type="submit"
          >
            <RiCheckFill />
          </button>
          {errors.title && (
            <div className="py-2 px-4 bg-red-400 text-white rounded-md w-full mt-1">
              {errors.title?.message}
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default Item;
