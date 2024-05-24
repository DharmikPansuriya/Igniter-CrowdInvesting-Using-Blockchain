import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useDisconnect,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
// import { ThirdwebSDK } from "thirdweb/sdk";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { readContract } from "thirdweb";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useConnect, metamaskWallet } from "@thirdweb-dev/react";

const queryClient = new QueryClient()

// Create a context for the state
const StateContext = createContext();

// Create a provider component to wrap around the app
export const StateContextProvider = ({ children }) => {
  // Get the contract instance from the blockchain
  // const { contract } = useContract(
  //   "0xc5e1d075b6213D1A6E623051c4e174dE73Fd0D77"
  // );
  // const sdk = ThirdwebSDK.fromSigner(signer, "goerli", {
  //   secretKey: "DlB9SPVC-LV1FCAaGL05rcLkr3fAvPcLC81cil_jfT0OuvnHbGlpsYpytmI7Hx4xmEON5I6IKub7Ed6kOssobA",
  // });

  const client = createThirdwebClient({ 
    secretKey: 'DlB9SPVC-LV1FCAaGL05rcLkr3fAvPcLC81cil_jfT0OuvnHbGlpsYpytmI7Hx4xmEON5I6IKub7Ed6kOssobA'
   });
  
  // connect to your contract
  const contract =getContract({ 
    client, 
    chain: defineChain(11155111), 
    address: "0xc5e1d075b6213D1A6E623051c4e174dE73Fd0D77"
  });
  if (!contract) {
    console.error("Contract not found");
    return null;
  }else{
    console.log("contract found", contract)
  }
  // Get a function to create a new project in the contract
  // const { mutateAsync: createProject } = useContractWrite(
  //   contract,
  //   "createProject"
  // );

  // Get the user's address
  const address = useAddress();

  // Get a function to connect to the user's MetaMask wallet
  // const connect = useMetamask();
  const metamaskConfig = metamaskWallet();
  const connect = useConnect();
  const handleConnect = async () => {
    try {
      await connect(metamaskConfig);
      console.log("Connected to wallet successfully!");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      // Handle connection errors gracefully (e.g., display an error message)
    }
  };

  // Get a function to disconnect from the user's MetaMask wallet
  const disconnectWallet = useDisconnect();

  // Create a function to publish a new project
  // const publishProject = async (form) => {
  //   try {
  //     // Call the contract's createProject function with the necessary parameters
  //     console.log("ttaddress", address)
  //     console.log("form", form)
  //     console.log("contract", contract)
  //     const data = await createProject([
  //       address, // owner
  //       form.title, // title
  //       form.description, // description
  //       form.target,
  //       new Date(form.deadline).getTime(), // deadline,
  //       form.image,
  //     ]);
  //     console.log("contract call success", data);
  //   } catch (error) {
  //     console.log("contract call failure", error);
  //   }
  // };


  
  const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();
  // const publishProject = async (form) => {
  //   try {
  //     // Prepare the contract call with method and parameters
  //     const transaction = await prepareContractCall({
  //       contract, // Use the obtained contract instance
  //       method: resolveMethod("createProject"), // Resolve the contract method
  //       params: [
  //         address, // owner
  //         form.title, // title
  //         form.description, // description
  //         ethers.utils.parseEther(form.target.toString()), // target in Ether
  //         new Date(form.deadline).getTime(), // deadline
  //         form.image, // image URL
  //       ],
  //     });

  //     console.log("transaction", transaction)
      
  //     // Send the transaction using useSendTransaction
  //     await sendTransaction(transaction);
  
  //     console.log("Contract call initiated:", transactionHash);
  
  //     // Handle loading and error states if needed (optional)
  //     if (isLoading) {
  //       console.log("Transaction pending...");
  //     } else if (isError) {
  //       console.error("Transaction failed:", isError);
  //     } else {
  //       console.log("done")
  //       // console.log("Contract call successful:", transactionHash);
  //     }
  //   } catch (error) {
  //     console.error("Error preparing contract call:", error);
  //   }
  // };

  const publishProject = async (form) => {
    try {
      if (!address) {
        console.log("No active wallet. Connecting...");
        await handleConnect();
      }

      if (!address) {
        console.error("Failed to connect wallet.");
        return;
      }
      const transaction = await prepareContractCall({
        contract,
        method: resolveMethod("createProject"),
        params: [
          address,
          form.title,
          form.description,
          ethers.utils.parseEther(form.target.toString()),
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      // console.log("Transaction", transaction);

      // // await sendTransaction(transaction, {
      // //   onSuccess(data) {
      // //     console.log("Contract call successful:", data.transactionHash);
      // //   },
      // //   onError(error) {
      // //     console.error("Transaction failed:", error);
      // //   },
      // // });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess(data) {
            console.log("Contract call successful:", data);
            resolve(data);
          },
          onError(error) {
            console.error("Transaction failed:", error);
            reject(error);
          },
        });
      });

  

      if (isLoading) {
        console.log("Transaction pending...");
      } 
    } catch (error) {
      console.error("Error preparing contract call:", error);
    }
  };

  // // Create a function to get all projects from the contract
  // const getProjects = async () => {
  //   // Call the contract's getProjects function to retrieve all projects
  //   const projects = await contract.call("getProjects");

  //   // Parse the projects array and format the values as necessary
  //   const parsedCampaings = projects.map((project, i) => ({
  //     founder: project.founder,
  //     title: project.title,
  //     description: project.description,
  //     goal: ethers.utils.formatEther(project.goal.toString()),
  //     deadline: project.deadline.toNumber(),
  //     balance: ethers.utils.formatEther(project.balance.toString()),
  //     image: project.image,
  //     pId: i,
  //   }));

  //   return parsedCampaings;
  // };

  const getProjects = async () => {
    try {
      // Call readContract to fetch data from the contract
      const data = await readContract({
        contract, // Use your obtained contract instance
        method: resolveMethod("getProjects"), // Resolve the contract method
        params: [], // No parameters needed in this case
      });

      console.log("data", data)
  
      // Parse the projects array and format the values as necessary
      const parsedProjects = data.map((project, i) => ({
        founder: project.founder,
        title: project.title,
        description: project.description,
        goal: ethers.utils.formatEther(project.goal.toString()),
        deadline: project.deadline.toNumber(),
        balance: ethers.utils.formatEther(project.balance.toString()),
        image: project.image,
        pId: i,
      }));
      console.log("parsedProjects", parsedProjects)
      return parsedProjects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Handle errors appropriately, such as displaying an error message to the user
      return []; // Or return an empty array on error
    }
  };

  // Create a function to get all projects created by the current user
  const getUserProjects = async () => {
    // Retrieve all projects
    const allProjects = await getProjects();
    console.log("allProjects ", allProjects)
    // Filter the projects array to get only the projects created by the current user
    const filteredProjects = allProjects.filter(
      (project) => project.founder === address
    );

    return filteredProjects;
  };

  // Create a function to invest in a project
  // const invest = async (pId, amount) => {
  //   // Call the contract's investToProject function with the necessary parameters
  //   const data = await contract.call("investToProject", pId, {
  //     value: ethers.utils.parseEther(amount),
  //   });

  //   return data;
  // };
  const invest = async (pId, amount) => { // Renamed for clarity
    try {
      // Prepare the contract call with the investment amount
      const transaction = await prepareContractCall({
        contract,
        method: resolveMethod("investToProject"),
        params: [pId, ethers.utils.parseEther(amount)], // Include project ID and parsed amount
      });

      // Send the transaction with error handling
      const data = await sendTransaction(transaction);
      console.log("Investment transaction initiated:", data);
      return data
      // Optionally return transactionHash or other relevant data

    } catch (error) {
      console.error("Error investing in project:", error);
      // Handle errors gracefully (e.g., display an error message to the user)
      throw error; // Re-throw for potential error handling in parent components
    }
  };


  // Create a function to get all investments for a projec  
  // const getInvestments = async (pId) => {
  //   // Call the contract's getInvestors function with the necessary parameter
  //   const investments = await contract.call("getInvestors", pId);
  //   const numberOfInvestments = investments[0].length;

  //   const parsedInvestments = [];

  //   // Create an array of objects with the investor's address and the amount invested
  //   for (let i = 0; i < numberOfInvestments; i++) {
  //     parsedInvestments.push({
  //       investor: investments[0][i],
  //       investment: ethers.utils.formatEther(investments[1][i].toString()),
  //     });
  //   }

  //   return parsedInvestments;
  // };

  const getInvestments = async (pId) => {
    try {
      // Leverage useReadContract for efficient read calls
      const { data, isLoading, isError } = useReadContract({
        contract,
        method: resolveMethod("getInvestors"),
        params: [pId],
      });
  
      if (isLoading) {
        console.log("Fetching investments...");
        // Optionally display a loading indicator to the user
        return null; // Or return an empty array while loading
      }
  
      if (isError) {
        console.error("Error fetching investments:", isError);
        // Handle errors gracefully (e.g., display an error message to the user)
        return []; // Or return an empty array on error
      }
  
      // Extract and parse investment data (same logic as before)
      const investments = data; // Data is already retrieved by useReadContract
      const numberOfInvestments = investments[0].length;
  
      const parsedInvestments = [];
      for (let i = 0; i < numberOfInvestments; i++) {
        parsedInvestments.push({
          investor: investments[0][i],
          investment: ethers.utils.formatEther(investments[1][i].toString()),
        });
      }
  
      return parsedInvestments;
    } catch (error) {
      console.error("Error fetching investments:", error);
      // Handle unexpected errors gracefully
      return []; // Or return an empty array on unexpected errors
    }
  };

  // Return the state context provider with all the necessary state and functions
  return (
    <QueryClientProvider client={queryClient}>

    <StateContext.Provider
      value={{
        address,
        contract,
        connect: handleConnect,
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
      </QueryClientProvider>
  );
};

export const useStateContext = () => useContext(StateContext);
