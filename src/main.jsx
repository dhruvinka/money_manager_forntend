import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </StrictMode>
);
