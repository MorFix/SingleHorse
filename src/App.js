import React from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

import {Game} from './Components/Game/Game';

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
        <Game />
      </ThemeProvider>
    </div>
  );
}

export default App;
