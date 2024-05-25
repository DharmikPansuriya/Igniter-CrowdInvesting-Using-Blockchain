import React, { useContext, useEffect, createContext } from "react";

import {
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { useSendTransaction , useReadContract} from "thirdweb/react";
import { readContract } from "thirdweb";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useConnect, metamaskWallet } from "@thirdweb-dev/react";
import { createWallet, injectedProvider } from "thirdweb/wallets";

const queryClient = new QueryClient()

// Create a context for the state
const StateContext = createContext();

// Create a provider component to wrap around the app
export const StateContextProvider = ({ children }) => {
  const client = createThirdwebClient({
    secretKey: 'DlB9SPVC-LV1FCAaGL05rcLkr3fAvPcLC81cil_jfT0OuvnHbGlpsYpytmI7Hx4xmEON5I6IKub7Ed6kOssobA',
    clientId: '657a36c79b20a4b2b861d604e4a319d3'
  });

  // connect to your contract
  const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: "0xc5e1d075b6213D1A6E623051c4e174dE73Fd0D77"
  });
  if (!contract) {
    console.error("Contract not found");
    return null;
  } else {
    console.log("contract found", contract)
  }




  const address = useAddress();

  const metamaskConfig = metamaskWallet();
  const connect = useConnect();
  const handleConnect = async () => {
    try {
      await connect(metamaskConfig);
      console.log("Connected to wallet successfully!");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  // Get a function to disconnect from the user's MetaMask wallet
  const disconnectWallet = useDisconnect();

  const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();

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
      console.log("address", address)
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
      console.log("connect", connect)
      console.log("transaction", transaction)
      console.log("wallet", wallet)
      console.log("account", account)
      try{
        const txReceipt = await sendTransaction(transaction, wallet, {
          onSuccess(data) {
            console.log("Contract call successful:", data);
          },
          onError(error) {
            console.error("Transaction failed:", error);
          },
        });
        console.log("sucessfuly sent to send transaction")
      }
      catch(error){
        console.log(
          "Send transaction error", error
        )
      }

      if (isLoading) {
        console.log("Transaction pending...");
      }
      if (isError) {
        console.log("Transaction failed...");
      }
    } catch (error) {
      console.error("Error preparing contract call:", error);
    }
  };

  const getProjects = async () => {
    try {
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
        deadline: project.deadline.toString(),
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
