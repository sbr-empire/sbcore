// 🌍 SBR BIOFORGE - Dark Green & Blue Theme
// Environmental & Climate Monitoring Theme

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#121212',      // Dark
      light: '#2D2D2D',
      dark: '#000000',
      contrastText: '#00C853',
    },
    secondary: {
      main: '#00C853',      // Green
      light: '#69F0AE',
      dark: '#00AA00',
      contrastText: '#000000',
    },
    accent: {
      main: '#87CEEB',      // Sky Blue
      light: '#ADD8E6',
      dark: '#4682B4',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0A0A0',
      disabled: '#606060',
    },
    success: {
      main: '#00C853',
    },
    error: {
      main: '#FF6B6B',
    },
    warning: {
      main: '#FFA500',
    },
    info: {
      main: '#87CEEB',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #00C853 0%, #87CEEB 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#00C853',
    },
    body1: {
      color: '#FFFFFF',
      fontSize: '1rem',
    },
    body2: {
      color: '#A0A0A0',
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
        },
        contained: {
          background: 'linear-gradient(135deg, #00C853 0%, #87CEEB 100%)',
          color: '#000000',
          '&:hover': {
            background: 'linear-gradient(135deg, #00AA00 0%, #4682B4 100%)',
          },
        },
        outlined: {
          borderColor: '#00C853',
          color: '#00C853',
          '&:hover': {
            backgroundColor: 'rgba(0, 200, 83, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          borderRadius: '12px',
          border: '1px solid #2A2A2A',
          boxShadow: '0 8px 32px rgba(0, 200, 83, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2A2A2A',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00C853',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#87CEEB',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #00C853 0%, #87CEEB 100%)',
          color: '#000000',
          fontWeight: 600,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
