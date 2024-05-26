import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useContext, createContext } from "react";
import { createWallet, injectedProvider } from "thirdweb/wallets";
import { client, contract } from "./../constants/index";
import {
    useAddress,
    metamaskWallet,
    useConnect,
    useDisconnect
} from "@thirdweb-dev/react";
import { useActiveAccount } from "thirdweb/react";
import { prepareContractCall, resolveMethod, readContract } from "thirdweb";

import { ethers } from "ethers";
import { useSendTransaction, useReadContract } from "thirdweb/react";

const queryClient = new QueryClient()

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const metamaskConfig = metamaskWallet();
    const connect = useConnect();
    const handleConnect = async () => {
        try {
            await connect(metamaskConfig);
            console.log("Wallet Connected!");
        } catch (error) {
            console.log("Error Connecting Wallet", error);
        }
    }

    const disconnectWallet = useDisconnect();
    const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();
    const account = useActiveAccount();
    if (account) {
        localStorage.setItem("wallet_address", account.address);
    }
    const publishProject = async (form) => {

        try {
            if (!account) {
                localStorage.removeItem("wallet_address");
                console.log("No active wallet. Connecting...");
                await handleConnect();
                localStorage.setItem("wallet_address", account.address);
            }

            if (!account) {
                localStorage.removeItem("wallet_address");
                console.error("Failed to connect wallet.");
                localStorage.setItem("wallet_address", account.address);
                return;
            }

            const transaction = await prepareContractCall({
                contract,
                method: resolveMethod("createProject"),
                params: [
                    account.address,
                    form.title,
                    form.description,
                    ethers.utils.parseEther(form.target.toString()),
                    new Date(form.deadline).getTime(),
                    form.image,
                ],
            });
            try {
                const txReceipt = await sendTransaction(transaction, account, {
                    onSuccess(data) {
                        console.log("Contract call successful:", data);
                    },
                    onError(error) {
                        console.error("Transaction failed:", error);
                    },
                });
                console.log("sucessfuly sent to send transaction")
            }
            catch (error) {
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
                contract, 
                method: resolveMethod("getProjects"), 
                params: [],
            });

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
            return parsedProjects;
        } catch (error) {
            console.error("Error fetching projects:", error);
            return [];
        }
    };

    const wallet_address = localStorage.getItem("wallet_address");

    const getUserProjects = async () => {
        const allProjects = await getProjects();
        const filteredProjects = allProjects.filter(
            (project) => project.founder === wallet_address
        );

        return filteredProjects;
    };

    const invest = async (pId, amount) => { // Renamed for clarity
        try {
            const transaction = await prepareContractCall({
                contract,
                method: resolveMethod("investToProject"),
                params: [pId, ethers.utils.parseEther(amount)],
            });

            const data = await sendTransaction(transaction);
            console.log("Investment transaction initiated:", data);
            return data

        } catch (error) {
            console.error("Error investing in project:", error);
            throw error;
        }
    };

    const getInvestments = async (pId) => {
        console.log("pId", pId)
        const { data, isLoading, isError } = readContract({
            contract,
            method: resolveMethod("getInvestors"),
            params: [pId],
        });
        try {

            if (isLoading) {
                console.log("Fetching investments...");
                return null;
            }

            if (isError) {
                console.error("inner Error fetching investments:", isError);
                return [];
            }

            const investments = data;
            console.log("data", data)
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
            console.error("outer Error fetching investments:", error);
            return [];
        }
    };

    return (
        <QueryClientProvider client={queryClient}>
            <StateContext.Provider
                value={{
                    account,
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
