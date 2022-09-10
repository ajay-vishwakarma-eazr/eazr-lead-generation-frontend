import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Button, createTheme, ThemeProvider } from '@mui/material'
import { useDetectTheme } from './hooks/useDetectTheme'
import { AnimatedRoutes } from './components/AnimatedRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
// import bg from '../src/assets/img/bg.jpg'
const App = () => {
  const systemTheme = useDetectTheme()
  const [mode, setMode] = React.useState('dark')
  const _theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ? mode : systemTheme,
        },
      }),
    [systemTheme, mode]
  )

  return (
    <ThemeProvider theme={_theme}>
      <CssBaseline />
      <div
        style={{
          display: 'grid',
          height: '100vh',
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: _theme.palette.background.default,
         
        }}>
        <Router>
          <AnimatedRoutes />
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
