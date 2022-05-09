import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
    <App />
);


reportWebVitals();
