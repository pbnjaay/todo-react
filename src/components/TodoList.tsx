import { Todo } from "../services/todoService";
import Item from "./Item";

interface Props {
  todos: Todo[];
  error: string;
  isLoading: boolean;
}
export const TodoList = ({ todos, error, isLoading }: Props) => {
  return (
    <div className="overflow-hidden">
      {error && <p>{error}</p>}
      {isLoading && <p className="animate-pulse">...Loading</p>}
      {todos?.map((todo, index) => (
        <Item key={index} todo={todo}></Item>
      ))}
    </div>
  );
};
