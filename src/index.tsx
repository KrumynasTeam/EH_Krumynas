import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { UserProvider } from './components/contexts/UserContext';
import { FixedContactMessage } from './components/messenger/FixedContactMessage';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
    <UserProvider>
        <App />
        <FixedContactMessage/>
    </UserProvider>
);


reportWebVitals();
