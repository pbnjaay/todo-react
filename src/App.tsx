import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import { TodoList } from "./components/TodoList";
import useTodos from "./hooks/useTodos";

enum state {
  "all",
  "completed",
  "active",
}

function App() {
  const [_status, setStatus] = useState(state.all);
  const { data: todos, error, isLoading } = useTodos();

  return (
    <div className="md:w-3/4 lg:w-1/2  w-11/12 shadow-md rounded-md bg-white p-4 md:p-6 space-y-8 overflow-x-hidden">
      <Form></Form>
      <Filter
        activeTasks={() => setStatus(state.active)}
        allTasks={() => setStatus(state.all)}
        completedTask={() => setStatus(state.completed)}
      ></Filter>
      <TodoList
        todos={todos || []}
        error={error?.message || ""}
        isLoading={isLoading}
      ></TodoList>
    </div>
  );
}

export default App;
