import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, WithStyles } from '@material-ui/core/styles';

// import bier from './../../logo.svg';

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

export interface Props extends WithStyles<typeof styles> {}

export class ToolBar extends React.Component {
  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Biergit Prototype App
          </Typography>
          {/* <img
            src={bier}
            className="App-logo"
            alt="logo"
            height="50"
            width="50"
          /> */}
        </Toolbar>
      </AppBar>
    );
  }
}
