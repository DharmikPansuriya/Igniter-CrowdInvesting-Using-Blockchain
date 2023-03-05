import React, { useState, useEffect } from "react";

import { DisplayProjects } from "../components";
import { useStateContext } from "../context";

const Dashboard = () => {
  // Initialize state variables
  const [isLoading, setIsLoading] = useState(false);
  const [liveProjects, setLiveProjects] = useState([]);
  const [archivedProjects, setArchivedProjects] = useState([]);

  // Get address, contract, and getUserProjects from the context
  const { address, contract, getProjects } = useStateContext();

  // This function will fetch the projects from blockchain using context/index.jsx file
  const fetchProjects = async () => {
    setIsLoading(true);
    // Get the data using the getProjects function from the context
    const data = await getProjects();
    // If data is not empty, filter the projects into live and archived
    if (data) {
      filterLiveAndArchivedProjects(data);
    }
    setIsLoading(false);
  };

  // This function will filter the projects and separate them into two arrays: liveProjects and archivedProjects
  const filterLiveAndArchivedProjects = (data) => {
    const archivedProjectsArray = [];
    const liveProjectsArray = [];
    // Loop through each project and check if it is live or archived
    data.forEach((project) => {
      // If the project's deadline is before the current time, it is archived
      if (project.deadline < Date.now()) {
        archivedProjectsArray.push(project);
      }
      // Otherwise, it is live
      else {
        liveProjectsArray.push(project);
      }
    });
    // Set the state variables to the filtered arrays
    setLiveProjects(liveProjectsArray);
    setArchivedProjects(archivedProjectsArray);
  };

  useEffect(() => {
    // Fetch the projects from the blockchain when the contract and address change
    if (contract) fetchProjects();
  }, [address, contract]);

  // Render the Live Projects and Archived Projects components
  return (
    <div>
      <DisplayProjects
        title="Live Projects"
        isLoading={isLoading}
        projects={liveProjects}
      />
      <DisplayProjects
        title="Archived Projects"
        isLoading={isLoading}
        projects={archivedProjects}
      />
    </div>
  );
};

export default Dashboard;
