import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import useProjectStore from "../store/useProjectStore.js";
import toast from "react-hot-toast";

const EditProject = ({ setShowEdit, project }) => {
  const { updateProject, fetchProjects, loading } = useProjectStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  // Populate the form with existing project details when it first loads
  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setStatus(project.status || "Pending");
    }
  }, [project]);

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Project title is required");

    try {
      await updateProject(project._id, { title, description, status });
      toast.success("Project updated successfully");
      setShowEdit(false); // Close modal
      fetchProjects(); // Refresh the project list
    } catch (err) {
      toast.error("Failed to update project");
    }
  };

  return (
    <div className="fixed inset-0 bg-primary/20 z-50 flex justify-center items-center">
      <div className="max-w-sm rounded-2xl bg-primary shadow-2xl w-full flex flex-col gap-4 items-center justify-center p-5 px-8">
        <div
          onClick={() => setShowEdit(false)}
          className="text-2xl cursor-pointer hover:scale-105 ml-auto text-white"
        >
          <IoClose />
        </div>
        <h1 className="font-bold text-xl pt-6 text-primary-content rounded-2xl">Edit Project</h1>
        <label className="floating-label w-full ">
          <span className="text-primary-content  ">Title</span>
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
          <span className="label text-primary-content">Status</span>
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
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default EditProject;
