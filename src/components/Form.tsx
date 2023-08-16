import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddTodo from "../hooks/useAddTodo";
import { Todo, todoSchema } from "../services/todoService";

const Form = () => {
  const addTodo = useAddTodo();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Todo>({ resolver: zodResolver(todoSchema) });

  return (
    <>
      {addTodo.error && (
        <div className="py-2 px-4 bg-red-400 text-white rounded-md w-full mt-1">
          {addTodo.error.message}
        </div>
      )}
      <form
        onSubmit={handleSubmit((data: Todo) => {
          addTodo.mutate(data);
          reset();
        })}
        className="flex flex-wrap"
      >
        <input
          placeholder="New task..."
          className="outline-none border-gray-300 border-2 rounded-md md:py-2 md:px-3 p-1 placeholder-gray-600 flex-grow lg:mr-2"
          type="text"
          id="title"
          autoFocus
          {...register("title")}
        />
        <button
          className="md:py-2 md:px-5 py-2 px-2 -ml-12 lg:-ml-0 bg-blue-500 hover:bg-blue-600 transition text-white rounded-md uppercase font-semibold"
          type="submit"
          disabled={isSubmitting}
        >
          Add
        </button>
        {errors.title && (
          <span className="py-2 px-4 bg-red-400 text-white rounded-md w-full mt-1">
            {errors.title?.message}
          </span>
        )}
      </form>
    </>
  );
};

export default Form;
