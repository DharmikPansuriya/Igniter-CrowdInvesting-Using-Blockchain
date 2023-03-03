import React, { useState, useEffect } from "react";

import { DisplayProjects } from "../components";
import { useStateContext } from "../context";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [liveProjects, setLiveProjects] = useState([]);
  const [archivedProjects, setArchivedProjects] = useState([]);

  const { address, contract, getUserProjects } = useStateContext();

  const fetchProjects = async () => {
    setIsLoading(true);
    const data = await getUserProjects();
    if (data) {
      filterLiveAndArchivedProjects(data);
    }
    setIsLoading(false);
  };

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

  useEffect(() => {
    if (contract) fetchProjects();
  }, [address, contract]);

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
