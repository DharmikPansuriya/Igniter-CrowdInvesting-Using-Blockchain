import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useDisconnect,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

// Create a context for the state
const StateContext = createContext();

// Create a provider component to wrap around the app
export const StateContextProvider = ({ children }) => {
  // Get the contract instance from the blockchain
  const { contract } = useContract(
    "0xf9445609e057464C5Ba0806Fc79575f6628E6829"
  );
  // Get a function to create a new project in the contract
  const { mutateAsync: createProject } = useContractWrite(
    contract,
    "createProject"
  );

  // Get the user's address
  const address = useAddress();

  // Get a function to connect to the user's MetaMask wallet
  const connect = useMetamask();

  // Get a function to disconnect from the user's MetaMask wallet
  const disconnectWallet = useDisconnect();

  // Create a function to publish a new project
  const publishProject = async (form) => {
    try {
      // Call the contract's createProject function with the necessary parameters
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

  // Create a function to get all projects from the contract
  const getProjects = async () => {
    // Call the contract's getProjects function to retrieve all projects
    const projects = await contract.call("getProjects");

    // Parse the projects array and format the values as necessary
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

  // Create a function to get all projects created by the current user
  const getUserProjects = async () => {
    // Retrieve all projects
    const allProjects = await getProjects();

    // Filter the projects array to get only the projects created by the current user
    const filteredProjects = allProjects.filter(
      (project) => project.founder === address
    );

    return filteredProjects;
  };

  // Create a function to invest in a project
  const invest = async (pId, amount) => {
    // Call the contract's investToProject function with the necessary parameters
    const data = await contract.call("investToProject", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  // Create a function to get all investments for a projec  
  const getInvestments = async (pId) => {
    // Call the contract's getInvestors function with the necessary parameter
    const investments = await contract.call("getInvestors", pId);
    const numberOfInvestments = investments[0].length;

    const parsedInvestments = [];

    // Create an array of objects with the investor's address and the amount invested
    for (let i = 0; i < numberOfInvestments; i++) {
      parsedInvestments.push({
        investor: investments[0][i],
        investment: ethers.utils.formatEther(investments[1][i].toString()),
      });
    }

    return parsedInvestments;
  };

  // Return the state context provider with all the necessary state and functions
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
