# Igniter


Igniter is a cutting-edge platform that empowers startup founders to list their ideas and enables investors to invest using ETH tokens through MetaMask. With a secure and efficient process for funding, Igniter aims to promote innovation and growth in the startup ecosystem.

## Tech Stack

Igniter is built using the following technologies:

- [Vite](https://vitejs.dev/) - ViteJS is a new frontend dev tool that offers a leaner, faster and seamless workflow for developing modern web app.
- [Tailwind CSS](https://tailwindcss.com/) - Tailwind CSS is an open source CSS framework. 
- [Solidity](https://soliditylang.org/) - Solidity is a statically-typed curly-braces programming language designed for developing smart contracts that run on Ethereum.
- [ThirdWeb](https://thirdweb.com/) - Thirdweb lets you build web3 apps easily. It provides smart contract management and in-built function to interect with smart-contract.
- [Goerli testnet](https://goerli.net/) - The Goerli testnet is a public Ethereum testnet that is based on the Proof-of-Authority consensus mechanism. It was created to provide developers with a more stable and reliable test environment for building and testing decentralized applications (dApps) on the Ethereum blockchain.

## Live Project

Project is deployed on netlify, You can intrect with smart contract by accessing this website:

https://igniter-investing.netlify.app/

## Pre-requisite

1. MetaMask should be installed in Chorme Browser as extension.

## Installation

To run Igniter, you will need to follow these steps:
1. Clone the repository to your local machine.
```bash
 git clone https://github.com/DharmikPansuriya/Igniter-CrowdInvesting-Using-Blockchain.git
```
2. Go inside `igniter-frontend` folder and Install the required dependencies.
```
npm install
```

3. Go to MetaMask chrome extension, and copy Private key of your account.

4. Create `.env` file inside `igniter-web3-backend` folder and paste secret key as follows:
```bash
PRIVATE_KEY=<Your Private Key>
```

5. Now, You need to deploy the smart contract using `thirdweb` on `Goerli Testnet`. Go inside `igniter-web3-backend` folder and run:
```bash
npm run deploy
```

6. After deployment of smart contract, you will receive smart contract address in thirdWeb dashboard. 

7. Copy that smart contract address. Then go to `igniter-frontend > context > index.jsx` file. 
```bash
 const { contract } = useContract(
    "<Replace smart contract addess here>"
  );
```

8. Go inside `igniter-frontend` folder and run frontend using below command:
```bash
npm run dev
```

9. It will run frontend on below address and port:
```bash
http://localhost:5173/
```

10. Project is up 🚀! You can interect with smart contract using this frontend.

## Usage

Once the project is running, you can access the Igniter platform. From there, startup founders can list their ideas, and investors can invest using ETH tokens through MetaMask.

## Contributions

We value contributions from the community to enhance Igniter and make it a more robust platform. To contribute, please follow these steps:

1. Fork the repository to your GitHub account.
2. Create a new branch for your changes.
3. Implement your changes and improvements.
4. Test your changes thoroughly.
5. Submit a pull request describing your changes and why they are valuable.
6. Await review and feedback from the project maintainers.
7. Address any requested changes and ensure your contribution meets our guidelines.
8. Your contribution will be reviewed and merged if it meets our standards.
