import { useState, useEffect } from "react";
import { AiFillContainer } from "react-icons/ai";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/NewTask";
import useTaskStore from "../store/useTaskStore";
import { useParams, useLocation } from "react-router-dom";

const TaskContainer = () => {
  const [newTask, setNewTask] = useState(false);
  const { id: projectId } = useParams();
  const { createTask, fetchTasks, tasks } = useTaskStore();
  const location = useLocation();
  const projectTitle = location.state?.title;
  const [prioritySort, setPrioritySort] = useState("");
  const [statusSort, setStatusSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getSortedAndFilteredTasks = () => {
    let filtered = [...tasks];

    if (prioritySort) {
      filtered = filtered.filter((task) => task.priority === prioritySort);
    }

    if (statusSort) {
      filtered = filtered.filter((task) => task.status === statusSort);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const priorityOrder = { Low: 1, Medium: 2, High: 3 };
    filtered.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    return filtered;
  };

  useEffect(() => {
    fetchTasks(projectId);
  }, [projectId]);

  return (
    <div className="h-[calc(100vh-4rem)] bg-base-100 w-full md:px-10">
      {newTask && (
        <CreateTask
          createTask={createTask}
          projectId={projectId}
          setNewTask={setNewTask}
        />
      )}

      <div className="flex  justify-between items-center p-4 border-b-2 border-accent">
        <div className="flex flex-col px-1 gap-2 w-full items-start justify-center ">
          <div className="flex items-center justify-center gap-2 ">
            <div className="text-xl text-accent">
              <AiFillContainer />
            </div>
            <h1 className="font-bold text-xl">{projectTitle}</h1>
          </div>
          <div className="flex w-full justify-between items-center ">
            <input
              placeholder="Search Task"
              type="text"
              className="input input-sm w-60 md:w-72 border-accent font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex gap-1 items-center">
              <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn btn-sm m-1">
                  Status
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li onClick={() => setStatusSort("Not Started")}>
                    <a>Not Started</a>
                  </li>
                  <li onClick={() => setStatusSort("Pending")}>
                    <a>Pending</a>
                  </li>
                  <li onClick={() => setStatusSort("Completed")}>
                    <a>Completed</a>
                  </li>
                  <li onClick={() => setStatusSort("")}>
                    <a>All</a>
                  </li>
                </ul>
              </div>

              <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn btn-sm m-1">
                  Priority
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li onClick={() => setPrioritySort("Low")}>
                    <a>Low</a>
                  </li>
                  <li onClick={() => setPrioritySort("Medium")}>
                    <a>Medium</a>
                  </li>
                  <li onClick={() => setPrioritySort("High")}>
                    <a>High</a>
                  </li>
                  <li onClick={() => setPrioritySort("")}>
                    <a>All</a>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setNewTask(!newTask)}
                className="btn btn-sm bg-accent text-accent-content hover:bg-accent/80"
              >
                New Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 overflow-auto h-[calc(100vh-9rem)]">
        {getSortedAndFilteredTasks().length === 0 ? (
          <div className="flex justify-center items-center text-center py-10">
            <p className="text-xl font-semibold text-gray-600">
              <span role="img" aria-label="no tasks" className="text-5xl">
                🚫
              </span>
              <br />
              No tasks yet! Create a new task to get started.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {getSortedAndFilteredTasks().map((task) => (
              <li key={task._id}>
                <TaskCard
                  task={task}
                  projectId={projectId}
                  setNewTask={setNewTask}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskContainer;
