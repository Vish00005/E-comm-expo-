import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)