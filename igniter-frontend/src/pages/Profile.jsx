import React, { useState, useEffect } from "react";
import { DisplayProjects } from "../components";
import { useStateContext } from "../context";

const Profile = () => {
  // Initialize state variables
  const [isLoading, setIsLoading] = useState(false);
  const [liveProjects, setLiveProjects] = useState([]);
  const [archivedProjects, setArchivedProjects] = useState([]);

  // Get address, contract, and getUserProjects from the context
  const { address, contract, getUserProjects } = useStateContext();

  // Fetch and filter user's projects
  const fetchProjects = async () => {
    setIsLoading(true);
    const data = await getUserProjects();
    if (data) {
      filterLiveAndArchivedProjects(data);
    }
    setIsLoading(false);
  };

  // Filter user's projects into live and archived
  const filterLiveAndArchivedProjects = (data) => {
    const archivedProjectsArray = [];
    const liveProjectsArray = [];
    console.log(data);
    data.forEach((project) => {
      if (project.deadline < Date.now()) {
        archivedProjectsArray.push(project);
      } else {
        liveProjectsArray.push(project);
      }
    });
    setLiveProjects(liveProjectsArray);
    setArchivedProjects(archivedProjectsArray);
  };

  // Fetch user's projects when component mounts or updates
  useEffect(() => {
    if (contract) fetchProjects();
  }, [address, contract]);

  // Render two DisplayProjects components for live and archived projects
  return (
    <div>
      <DisplayProjects
        title="My Live Projects"
        isLoading={isLoading}
        projects={liveProjects}
      />
      <DisplayProjects
        title="My Archived Projects"
        isLoading={isLoading}
        projects={archivedProjects}
      />
    </div>
  );
};

export default Profile;
