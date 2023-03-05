# Igniter


Igniter is a cutting-edge platform that empowers startup founders to list their ideas and enables investors to invest using ETH tokens through MetaMask. With a secure and efficient process for funding, Igniter aims to promote innovation and growth in the startup ecosystem.

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

## Technologies Used

Igniter was built using the following technologies:

- Vite
- Solidity
- ThirdWeb Framework
- Goerli testnet
