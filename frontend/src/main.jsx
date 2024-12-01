import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId='357026104614-rkhc8k3bfjc6sj0r277qkec1fkqgbjsc.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
