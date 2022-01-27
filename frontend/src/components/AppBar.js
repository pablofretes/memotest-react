import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import ToolBar from '@material-ui/core/ToolBar';
import { Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'orange'
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
  },
  button: {
    fontFamily: 'Cairo',
    fontWeight: 'bolder'
  }
}))

const AppBarMemotest = ({ token, setToken }) => {
  const classes = useStyles();
  const client = useApolloClient();

  const handleLogOut = () => {
    localStorage.clear();
    setToken(null);
    client.resetStore();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.appBar} component='div'>
        <ToolBar variant="dense" className={classes.toolBar} component='div'>
            <Button component={Link} to="/" data-cy="home-button" className={classes.button}>
              Home
            </Button>
            <Button component={Link} to="/leaderboard" data-cy="leaderboard-button" className={classes.button}>
              Leaderboard
            </Button>
            {token !== null ? (
                <Button onClick={handleLogOut} to="/login" data-cy="logout-button" component={Link} className={classes.button}>
                  Log Out
                </Button>
            ) : (
                <Button component={Link} to="/login" data-cy="login-button" className={classes.button}>Log In</Button>
            )}
            {token === null && (
              <Button component={Link} to="/signUp" data-cy="signUp-button" className={classes.button}>Sign Up</Button>
            )}
        </ToolBar>
      </AppBar>
    </Box>
  );
}

export default AppBarMemotest;