// 💄 SBR BEAUTY HUB - Modern Pink & Cyan Theme
// Trendy Beauty Marketplace Theme

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0F0F0F',      // Deep Black
      light: '#2A2A2A',
      dark: '#000000',
      contrastText: '#FF1493',
    },
    secondary: {
      main: '#FF1493',      // Hot Pink
      light: '#FF69B4',
      dark: '#C71585',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#00D4FF',      // Cyan
      light: '#00F0FF',
      dark: '#0099CC',
    },
    background: {
      default: '#0F0F0F',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      disabled: '#606060',
    },
    success: {
      main: '#00D4FF',
    },
    error: {
      main: '#FF6B6B',
    },
    warning: {
      main: '#FFA500',
    },
    info: {
      main: '#FF1493',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #FF1493 0%, #00D4FF 100%)',
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
      color: '#FF1493',
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
          background: 'linear-gradient(135deg, #FF1493 0%, #00D4FF 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #C71585 0%, #0099CC 100%)',
          },
        },
        outlined: {
          borderColor: '#FF1493',
          color: '#FF1493',
          '&:hover': {
            backgroundColor: 'rgba(255, 20, 147, 0.1)',
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
          boxShadow: '0 8px 32px rgba(255, 20, 147, 0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0, 212, 255, 0.2)',
          },
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333333',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF1493',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00D4FF',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #FF1493 0%, #00D4FF 100%)',
          color: '#FFFFFF',
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
