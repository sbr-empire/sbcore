// 🕌 SBR HIKMAH - Black & Golden Theme
// Premium Islamic Knowledge Platform Theme

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000000',      // Pure Black
      light: '#1A1A1A',
      dark: '#0A0A0A',
      contrastText: '#FFD700',
    },
    secondary: {
      main: '#FFD700',      // Gold
      light: '#FFF44F',
      dark: '#DAA520',
      contrastText: '#000000',
    },
    accent: {
      main: '#1E90FF',      // Blue (Trust)
      light: '#87CEEB',
      dark: '#00008B',
    },
    background: {
      default: '#000000',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      disabled: '#606060',
    },
    success: {
      main: '#FFD700',
    },
    error: {
      main: '#FF6B6B',
    },
    warning: {
      main: '#FFA500',
    },
    info: {
      main: '#1E90FF',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FFD700',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    body1: {
      color: '#FFFFFF',
      fontSize: '1rem',
    },
    body2: {
      color: '#B0B0B0',
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
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          color: '#000000',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
          },
        },
        outlined: {
          borderColor: '#FFD700',
          color: '#FFD700',
          '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          borderRadius: '12px',
          border: '1px solid #333333',
          boxShadow: '0 8px 32px rgba(255, 215, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          backgroundImage: 'none',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottomColor: '#FFD700',
          },
          '&:hover:before': {
            borderBottomColor: '#FFA500',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333333',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFD700',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFD700',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFD700',
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
