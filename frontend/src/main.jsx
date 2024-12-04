import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
