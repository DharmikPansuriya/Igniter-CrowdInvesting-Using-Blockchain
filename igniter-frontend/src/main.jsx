import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import {ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import {StateContextProvider} from './context';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>

    <ThirdwebProvider activeChain={'sepolia'} clientId='657a36c79b20a4b2b861d604e4a319d3'>
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
    </QueryClientProvider>
);