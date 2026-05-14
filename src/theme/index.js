import { createTheme } from '@mui/material/styles'

const fontStack = [
  "'Noto Sans TC'",
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'PingFang TC',
  'Microsoft JhengHei',
  'Roboto',
  'sans-serif',
].join(',')

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0097A7', dark: '#005F64', light: '#C5F0F7' },
    secondary: { main: '#546E7A', dark: '#37474F', light: '#ECEFF1' },
    error: { main: '#D32F2F' },
    success: { main: '#2E7D32' },
    info: { main: '#0288D1' },
    background: { default: '#EAF3F5', paper: '#FFFFFF' },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.6)',
    },
    divider: 'rgba(0,0,0,0.12)',
  },
  typography: {
    fontFamily: fontStack,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    subtitle3: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.1px',
    },
    captionMedium: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.66,
      letterSpacing: '0.4px',
    },
  },
  shape: { borderRadius: 4 },
  shadows: ['none', ...Array(24).fill('none')],
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle3: 'p',
          captionMedium: 'span',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#EAF3F5' },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { borderRadius: 8, boxShadow: 'none', backgroundImage: 'none' },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'transparent' },
      styleOverrides: {
        root: {
          backgroundColor: '#EAF3F5',
          boxShadow: 'none',
          color: 'rgba(0,0,0,0.87)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
          '@media (min-width: 600px)': {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#EAF3F5',
          borderRight: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 4 },
        contained: {
          boxShadow:
            '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px rgba(0,0,0,0.14), 0px 1px 5px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 16, fontSize: 13, height: 24 },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: { backgroundColor: '#ECEFF1' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#546E7A',
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: '0.17px',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
        },
        body: {
          fontSize: 14,
          letterSpacing: '0.17px',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow:
            '0px 11px 15px rgba(0,0,0,0.2), 0px 9px 46px rgba(0,0,0,0.12)',
          borderRadius: 8,
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: { boxShadow: '0px 3px 5px rgba(0,0,0,0.2)' },
      },
    },
  },
})

export default theme
