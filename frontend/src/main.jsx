import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'
import App from './App.jsx'
import {SnackbarProvider} from 'notistack'
import { MaterialDesignContent } from 'notistack'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1d1d1d'
    }
  },
});

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({

  '&.notistack-MuiContent-error': {
    width: '21vw'
  },
  '&.notistack-MuiContent-success': {
    width: '21vw'
  },
}));
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <ThemeProvider theme={darkTheme} noSsr>
      <CssBaseline />
      <SnackbarProvider Components={{error: StyledMaterialDesignContent, success: StyledMaterialDesignContent}} maxSnack={3} autoHideDuration={1500}>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
