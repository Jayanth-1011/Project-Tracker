import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import useTaskStore from "../store/useTaskStore";

const CreateTask = ({ setNewTask,projectId}) => {
  const { loading, createTask, fetchTasks } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Task title is required");

    try {
      await createTask({ title, description, status, priority }, projectId);
      toast.success("Task created successfully");
      setNewTask(false); // Close modal
      fetchTasks(projectId) // Refresh list
    } catch (err) {
      toast.error("Failed to create Task");
    }
  };
  return (
    <div className="fixed inset-0  bg-primary/20 z-50 flex justify-center items-center">
      <div className="max-w-sm rounded-2xl bg-primary shadow-2xl w-full flex flex-col gap-4 items-center justify-center p-5 px-8">
        <div
          onClick={() => setNewTask(false)}
          className="text-2xl cursor-pointer hover:scale-105 self-end text-white"
        >
          <IoClose />
        </div>

        <h1 className="font-bold text-xl  text-white">New Task</h1>

        <label className="w-full text-white">
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            autoFocus
            className="input w-full border-primary border-1 text-base-content focus:outline-1 focus:outline-white focus:border-transparent"
          />
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="textarea textarea-bordered text-base-content textarea-primary w-full"
        />

        <div className="w-full">
          <span className="text-white">Status</span>
          <select
            className="select select-bordered w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="w-full">
          <span className="text-white">Priority</span>
          <select
            className="select select-bordered w-full"
            value={status}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button
          className="btn btn-accent"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
