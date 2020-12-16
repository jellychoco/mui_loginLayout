import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6E69FA',
      main: '#4A4ED9'
    },
    secondary: {
      main: '#ED399E'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontFamily: '"Montserrat", "Noto Sans KR", sans-serif',
          color: '#202122',
          overflow: 'hidden'
        }
      }
    },
    MuiTypography: {
      h6: {
        fontFamily: '"Montserrat", "Noto Sans KR", sans-serif'
      },
      body1: {
        fontFamily: '"Montserrat", "Noto Sans KR", sans-serif'
      },
      body2: {
        fontFamily: '"Montserrat", "Noto Sans KR", sans-serif'
      },
      caption: {
        fontFamily: '"Montserrat", "Noto Sans KR", sans-serif'
      }
    },
    MuiFormLabel: {
      root: {
        fontFamily: '"Montserrat", "Noto Sans KR", sans-serif',
        fontSize: '0.9rem'
      }
    },
    MuiInputBase: {
      input: {
        fontFamily: '"Montserrat", "Noto Sans KR", sans-serif'
      }
    },
    MuiBottomNavigationAction: {
      root: {
        minWidth: 60
      },
      label: {
        fontFamily: '"Montserrat", "Noto Sans KR", sans-serif',
        fontWeight: 'bold',
        '&.Mui-selected': {
          fontSize: '0.75rem'
        }
      }
    },
    MuiBottomNavigation: {
      root: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderRadius: '10px 10px 0 0',
        boxShadow: '0px -10px 15px 0px rgba(0,0,0,0.14)'
      }
    },
    MuiTableCell: {
      root: {
        fontSize: '0.7rem',
        fontFamily: '"Montserrat", "Noto Sans KR", sans-serif'
      }
    },
    MuiFormHelperText: {
      root: {
        fontFamily: '"Montserrat", "Noto Sans KR", sans-serif'
      }
    },
    MuiAvatar: {
      root: {
        fontFamily: '"Montserrat", "Noto Sans KR", sans-serif'
      }
    }
  }
})

export default theme