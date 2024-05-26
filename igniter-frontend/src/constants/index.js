import {
  home,
  createProject,
  profile,
} from "../assets";

import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

export const navlinks = [
  {
    name: "Dashboard",
    imgUrl: home,
    link: "/",
  },
  {
    name: "Project",
    imgUrl: createProject,
    link: "/create-project",
  },
  {
    name: "Profile",
    imgUrl: profile,
    link: "/profile",
  },
];

export const client = createThirdwebClient({
  clientId: "657a36c79b20a4b2b861d604e4a319d3",
});

export const contract = getContract({
  client,
  chain: sepolia,
  clientId: '657a36c79b20a4b2b861d604e4a319d3',
  address: "0xc5e1d075b6213D1A6E623051c4e174dE73Fd0D77",
  // abi: [
  //     {
  //       "type": "function",
  //       "name": "createProject",
  //       "inputs": [
  //         {
  //           "type": "address",
  //           "name": "_founder",
  //           "internalType": "address"
  //         },
  //         {
  //           "type": "string",
  //           "name": "_title",
  //           "internalType": "string"
  //         },
  //         {
  //           "type": "string",
  //           "name": "_description",
  //           "internalType": "string"
  //         },
  //         {
  //           "type": "uint256",
  //           "name": "_goal",
  //           "internalType": "uint256"
  //         },
  //         {
  //           "type": "uint256",
  //           "name": "_deadline",
  //           "internalType": "uint256"
  //         },
  //         {
  //           "type": "string",
  //           "name": "_image",
  //           "internalType": "string"
  //         }
  //       ],
  //       "outputs": [
  //         {
  //           "type": "uint256",
  //           "name": "",
  //           "internalType": "uint256"
  //         }
  //       ],
  //       "stateMutability": "nonpayable"
  //     },
  //     {
  //       "type": "function",
  //       "name": "getInvestors",
  //       "inputs": [
  //         {
  //           "type": "uint256",
  //           "name": "_id",
  //           "internalType": "uint256"
  //         }
  //       ],
  //       "outputs": [
  //         {
  //           "type": "address[]",
  //           "name": "",
  //           "internalType": "address[]"
  //         },
  //         {
  //           "type": "uint256[]",
  //           "name": "",
  //           "internalType": "uint256[]"
  //         }
  //       ],
  //       "stateMutability": "view"
  //     },
  //     {
  //       "type": "function",
  //       "name": "getProjects",
  //       "inputs": [],
  //       "outputs": [
  //         {
  //           "type": "tuple[]",
  //           "name": "",
  //           "components": [
  //             {
  //               "type": "address",
  //               "name": "founder",
  //               "internalType": "address"
  //             },
  //             {
  //               "type": "string",
  //               "name": "title",
  //               "internalType": "string"
  //             },
  //             {
  //               "type": "string",
  //               "name": "description",
  //               "internalType": "string"
  //             },
  //             {
  //               "type": "uint256",
  //               "name": "goal",
  //               "internalType": "uint256"
  //             },
  //             {
  //               "type": "uint256",
  //               "name": "deadline",
  //               "internalType": "uint256"
  //             },
  //             {
  //               "type": "uint256",
  //               "name": "balance",
  //               "internalType": "uint256"
  //             },
  //             {
  //               "type": "string",
  //               "name": "image",
  //               "internalType": "string"
  //             },
  //             {
  //               "type": "address[]",
  //               "name": "investors",
  //               "internalType": "address[]"
  //             },
  //             {
  //               "type": "uint256[]",
  //               "name": "investment",
  //               "internalType": "uint256[]"
  //             }
  //           ],
  //           "internalType": "struct CrowdInvest.Project[]"
  //         }
  //       ],
  //       "stateMutability": "view"
  //     },
  //     {
  //       "type": "function",
  //       "name": "investToProject",
  //       "inputs": [
  //         {
  //           "type": "uint256",
  //           "name": "_id",
  //           "internalType": "uint256"
  //         }
  //       ],
  //       "outputs": [],
  //       "stateMutability": "payable"
  //     },
  //     {
  //       "type": "function",
  //       "name": "projectCount",
  //       "inputs": [],
  //       "outputs": [
  //         {
  //           "type": "uint256",
  //           "name": "",
  //           "internalType": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view"
  //     },
  //     {
  //       "type": "function",
  //       "name": "projects",
  //       "inputs": [
  //         {
  //           "type": "uint256",
  //           "name": "",
  //           "internalType": "uint256"
  //         }
  //       ],
  //       "outputs": [
  //         {
  //           "type": "address",
  //           "name": "founder",
  //           "internalType": "address"
  //         },
  //         {
  //           "type": "string",
  //           "name": "title",
  //           "internalType": "string"
  //         },
  //         {
  //           "type": "string",
  //           "name": "description",
  //           "internalType": "string"
  //         },
  //         {
  //           "type": "uint256",
  //           "name": "goal",
  //           "internalType": "uint256"
  //         },
  //         {
  //           "type": "uint256",
  //           "name": "deadline",
  //           "internalType": "uint256"
  //         },
  //         {
  //           "type": "uint256",
  //           "name": "balance",
  //           "internalType": "uint256"
  //         },
  //         {
  //           "type": "string",
  //           "name": "image",
  //           "internalType": "string"
  //         }
  //       ],
  //       "stateMutability": "view"
  //     }
  // ]
});