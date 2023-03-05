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
    const data = await getProjects();
    if (data){
      filterLiveAndArchivedProjects(data);
    }
    setIsLoading(false);
  };

  // This function will filter the projects and separate them into two arrays: liveProjects and archivedProjects
  const filterLiveAndArchivedProjects = (data) => {
    const archivedProjectsArray = [];
    const liveProjectsArray = [];
    data.forEach((project) => {
      if (project.deadline < Date.now()) {
        archivedProjectsArray.push(project);
      }
      else{
        liveProjectsArray.push(project)
      }
    });
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
