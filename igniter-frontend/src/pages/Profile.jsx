import React, { useState, useEffect } from "react";

import { DisplayProjects } from "../components";
import { useStateContext } from "../context";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const { address, contract, getUserProjects } = useStateContext();

  const fetchProjects = async () => {
    setIsLoading(true);
    const data = await getUserProjects();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchProjects();
  }, [address, contract]);

  return (
    <DisplayProjects
      title="My Projects"
      isLoading={isLoading}
      projects={projects}
    />
  );
};

export default Profile;
