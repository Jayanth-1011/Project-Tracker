import { useEffect, useState } from "react";
import Card from "../components/Card";
import NewProject from "../components/NewProject";
import useProjectStore from "../store/useProjectStore";

const HomePage = () => {
  const { fetchProjects, projects } = useProjectStore(); // Fetching the projects and fetchProjects function from the store
  const [pop, setPop] = useState(false);

  // Fetch projects only once when the component is mounted
  useEffect(() => {
    if (projects.length === 0) {
      // Check to ensure projects aren't already fetched
      fetchProjects();
      console.log(projects);
    }
  }, [fetchProjects, projects.length]); // Only re-run if projects array length is 0 (i.e., first time)

  return (
    <div className="bg-base-100 h-[calc(100vh-4rem)] w-full flex items-center justify-center">
      {pop && (
        <div className="z-40 absolute inset-0 bg-primary/40 w-full h-[100vh-4rem] flex items-center justify-center">
          <NewProject setPop={setPop} />
        </div>
      )}
      <div className="w-full max-w-6xl h-full flex flex-col items-start justify-start px-3 py-4 gap-3">
        <div className="flex justify-between w-full px-6">
          <h1 className="text-xl font-bold">My Projects</h1>
          <div className="space-x-5">
            <button
              className="btn"
              popoverTarget="popover-1"
              style={{ anchorName: "--anchor-1" }}
            >
              Sort by
            </button>
            <ul
              className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
              popover="auto"
              id="popover-1"
              style={{ positionAnchor: "--anchor-1" }}
            >
              <li>
                <a>Date</a>
              </li>
              <li>
                <a>Relevant</a>
              </li>
            </ul>
            <button
              onClick={() => setPop(!pop)}
              className="btn bg-primary text-primary-content px-3 rounded-lg"
            >
              New Project
            </button>
          </div>
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,3fr))] overflow-y-auto w-full p-5 gap-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project._id}>
                <Card project={project} />
              </li>
            ))
          ) : (
            <p>No projects found. Please add a new project.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
