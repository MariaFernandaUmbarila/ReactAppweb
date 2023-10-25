import './App.css';
import CenteredTable from './student/student';
import DefaulAppBar from './utils/navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <div className="App">
        <DefaulAppBar/>
        <CenteredTable/>
      </div>
    </ThemeProvider> 
  );
}

export default App;
