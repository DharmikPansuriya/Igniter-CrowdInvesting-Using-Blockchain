import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
// import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xf9445609e057464C5Ba0806Fc79575f6628E6829"
  );
  const { mutateAsync: createProject } = useContractWrite(
    contract,
    "createProject"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    console.log(form);
    try {
      const data = await createProject([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image,
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getProjects = async () => {
    const campaigns = await contract.call("getProjects");

    const parsedCampaings = campaigns.map((campaign, i) => ({
      founder: campaign.founder,
      title: campaign.title,
      description: campaign.description,
      goal: ethers.utils.formatEther(campaign.goal.toString()),
      deadline: campaign.deadline.toNumber(),
      balance: ethers.utils.formatEther(campaign.balance.toString()),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaings;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getProjects();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.founder === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("investToProject", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getInvestors", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createProject: publishCampaign,
        getProjects,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
