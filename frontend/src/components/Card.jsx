import React, { useState } from "react";
import { IoLogoFlickr } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import useProjectStore from "../store/useProjectStore";
import { useNavigate } from "react-router-dom";
import EditProject from "./EditProject";

const Card = ({ project }) => {
  const navigate = useNavigate();
  const { deleteProject } = useProjectStore();
  const [showEdit, setShowEdit] = useState(false);

  const handleClick = () => {
    navigate(`/project/${project._id}`, {
      state: { title: project.title },
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col justify-between hover:bg-primary/30  duration-200 bg-base-100 shadow-md rounded-lg p-4 h-full hover:shadow-lg transition-all"
    >
      {showEdit && (
        <div
          className="w-full max-w-6xl h-full flex flex-col items-start justify-start px-3 py-4 gap-3"
          onClick={(e) => e.stopPropagation()}
          tabIndex="0"
        >
          <EditProject setShowEdit={setShowEdit} project={project} />
        </div>
      )}

      <div className="flex gap-2 items-center justify-start">
        <div className="text-2xl bg-primary p-1 rounded-md text-white">
          <IoLogoFlickr />
        </div>
        <div className="flex flex-col leading-5 text-primary-content/70">
          <h1 className="font-medium text-primary-content">{project.title}</h1>
          <h5 className="text-sm pl-1">Created: {formatDate(project.createdAt)}</h5>
          {project.status === "Completed" && (
            <h5 className="text-sm pl-1">Completed: {formatDate(project.completedAt)}</h5>
          )}
        </div>

        <div className="ml-auto text-lg text-primary-content font-bold cursor-pointer">
          <div
            className="dropdown dropdown-left"
            onClick={(e) => e.stopPropagation()}
          >
            <label
              className="bg-base-100 btn border-none m-1"
              tabIndex="0"
              onClick={(e) => e.stopPropagation()}
            >
              <CiMenuKebab />
            </label>
            <ul
              tabIndex="0"
              className="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-box w-20"
              onClick={(e) => e.stopPropagation()}
            >
              <li onClick={() => setShowEdit(true)}>
                <a>Edit</a>
              </li>
              <li>
                <a onClick={() => deleteProject(project._id)}>Delete</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-sm font-sans pl-10">{project.description}</p>
      <div className="pl-10 font-medium text-accent">{project.status}</div>
    </div>
  );
};

export default Card;
