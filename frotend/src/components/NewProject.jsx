import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import useProjectStore from "../store/useProjectStore.js";
import toast from "react-hot-toast";

const NewProject = ({ setPop }) => {
  const { createProject, fetchProjects, loading } = useProjectStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Project title is required");

    try {
      await createProject({ title, description,status });
      toast.success("Project created successfully");
      setPop(false); // Close modal
      fetchProjects(); // Refresh list
    } catch (err) {
      toast.error("Failed to create project");
    }
  };

  return (
    <div className="max-w-sm rounded-2xl bg-primary shadow-2xl w-full flex flex-col gap-4 items-center justify-center p-5 px-8">
      <div
        onClick={() => setPop(false)}
        className="text-2xl cursor-pointer hover:scale-105 ml-auto text-white"
      >
        <IoClose />
      </div>
      <h1 className="font-bold text-xl pt-6 text-white">New Project</h1>
      <label className="floating-label w-full">
        <span className="text-white">Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          className="input w-full border-primary border-1 focus:outline-1 focus:outline-white focus:border-transparent"
        />
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="textarea textarea-bordered textarea-primary w-full"
      />
      <label className="select w-full">
        <span className="label text-white">Status</span>
        <select
          className="select select-bordered w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </label>
      <button
        className="btn mb-auto btn-accent"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
};

export default NewProject;
