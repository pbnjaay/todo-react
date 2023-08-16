interface Props {
  allTasks: () => void;
  activeTasks: () => void;
  completedTask: () => void;
}

const Filter = ({ allTasks, activeTasks, completedTask }: Props) => {
  return (
    <div className="flex justify-start space-x-2 md:space-x-5">
      <button
        onClick={allTasks}
        className="text-sm text-blue-500 md:px-3 px-1 py-1 border-2 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all uppercase font-semibold"
      >
        All
      </button>
      <button
        onClick={activeTasks}
        className="text-sm text-blue-500 md:px-3 px-1 py-1 border-2 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all uppercase font-semibold"
      >
        Active
      </button>
      <button
        onClick={completedTask}
        className="text-sm text-blue-500 md:px-3 px-1 py-1 border-2 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all uppercase font-semibold"
      >
        Completed
      </button>
    </div>
  );
};

export default Filter;
