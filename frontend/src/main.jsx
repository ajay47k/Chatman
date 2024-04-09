import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import VideoBackground from '../components/Backgrounds/Backgrounds.jsx';
import AuthContextProvider from './../context/AuthContextProvider.jsx'; // Adjusted import
import { Toaster } from 'react-hot-toast';
import { SocketContextProvider } from './../context/SocketContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
    <VideoBackground/>
    <Toaster />
    <AuthContextProvider>
    <BrowserRouter>
    <SocketContextProvider>
    <App />
    </SocketContextProvider> 
    </BrowserRouter>
    </AuthContextProvider>
    </>
  </React.StrictMode>
);
