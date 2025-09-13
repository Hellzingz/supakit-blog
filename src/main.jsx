import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import jwtInterceptor from './utils/jwtInterceptor';
import { AuthProvider } from './context/authContext';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "./components/ui/sonner"

jwtInterceptor();

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </BrowserRouter>
</StrictMode>
)
