import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getProjects } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getProjects();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <DisplayCampaigns
        title="All Projects"
        isLoading={isLoading}
        campaigns={campaigns}
        />
    </div>
  );
};

export default Dashboard;
