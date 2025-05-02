import { useEffect, useState } from "react";
import { BiTask } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import useTaskStore from "../store/useTaskStore";
import EditTask from "./EditTask";

const TaskCard = ({ task }) => {
  const { deleteTask } = useTaskStore();
  const [showEdit, setShowEdit] = useState(false);

  // Format created time
  const formatCreatedAt = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  // Get status color class
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-200 text-gray-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-base-200 text-base-content";
    }
  };

  return (
    <div className="flex flex-col justify-between bg-base-100 shadow-md rounded-lg p-4 h-full hover:shadow-lg transition-all">
      {showEdit && <EditTask task={task} setShowEdit={setShowEdit} />}

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="btn btn-xs text-lg bg-primary text-primary-content rounded">
            <BiTask />
          </div>
          <h1 className="text-md font-bold line-clamp-1">{task.title}</h1>
        </div>

        <div className="flex font-medium flex-col items-end text-xs gap-1">
          <span className={`px-2 py-0.5 rounded-full ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full 
              ${task.priority === "Low" ? "bg-green-100 text-green-700" : ""}
              ${task.priority === "Medium" ? "bg-yellow-100 text-yellow-700" : ""}
              ${task.priority === "High" ? "bg-red-100 text-red-700" : ""}`}
          >
            Priority: {task.priority || "Medium"}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mt-4 flex-1 line-clamp-3">
        {task.description || "No description provided for this task."}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <span>Created: {formatCreatedAt(task.createdAt)}</span>

        <div className="flex gap-2">
          <button
            onClick={() => setShowEdit(true)}
            className="btn btn-xs bg-base-200 text-base-content hover:bg-base-300"
          >
            <CiEdit className="text-lg" />
          </button>
          <button
            onClick={() => deleteTask(task._id)}
            className="btn btn-xs bg-red-100 text-red-600 hover:bg-red-200"
          >
            <MdDeleteOutline className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
