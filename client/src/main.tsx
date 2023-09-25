import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'flowbite';

console.log(
  `${import.meta.env.VITE_NODE_API}:${import.meta.env.VITE_NODE_API_PORT}`
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
