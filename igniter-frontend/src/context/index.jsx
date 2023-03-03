import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useDisconnect,
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
  const disconnectWallet = useDisconnect();

  const publishProject = async (form) => {
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
    const projects = await contract.call("getProjects");

    const parsedCampaings = projects.map((project, i) => ({
      founder: project.founder,
      title: project.title,
      description: project.description,
      goal: ethers.utils.formatEther(project.goal.toString()),
      deadline: project.deadline.toNumber(),
      balance: ethers.utils.formatEther(project.balance.toString()),
      image: project.image,
      pId: i,
    }));

    return parsedCampaings;
  };

  const getUserProjects = async () => {
    const allProjects = await getProjects();

    const filteredProjects = allProjects.filter(
      (project) => project.founder === address
    );

    return filteredProjects;
  };

  const invest = async (pId, amount) => {
    const data = await contract.call("investToProject", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getInvestments = async (pId) => {
    const investments = await contract.call("getInvestors", pId);
    const numberOfInvestments = investments[0].length;

    const parsedInvestments = [];

    for (let i = 0; i < numberOfInvestments; i++) {
      parsedInvestments.push({
        investor: investments[0][i],
        investment: ethers.utils.formatEther(investments[1][i].toString()),
      });
    }

    return parsedInvestments;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        disconnectWallet,
        createProject: publishProject,
        getProjects,
        getUserProjects,
        invest,
        getInvestments,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
