import React from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

import {Board} from './Components/Board/Board';

import './App.css';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: grey,
      secondary: blue
    }
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Board></Board>
      </ThemeProvider>
    </div>
  );
}

export default App;
