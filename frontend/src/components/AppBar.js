import React from 'react';
import { Button, makeStyles, AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  appBar: {
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  filter: {
    position: 'absolute',
    top: 95,
    right: 50,
    width: '100%',
  },
  button: {
    marginLeft: "auto"
  }
}))

const AppBarMemotest = ({ token, setToken }) => {
  const classes = useStyles();

  const handleLogOut = () => {
    localStorage.removeItem('user-token');
    setToken(null);
  };

  console.log(token)

  return (
    <Box className={classes.root}>
      <AppBar position="static" color="primary" className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
              <Button color="inherit" component={Link} to="/" data-cy='home-button'>
                Home
              </Button>
              <Button color="inherit" component={Link} to="/leaderboard" data-cy='leaderboard-button'>
                Leaderboard
              </Button>
          </Typography>
        </Toolbar>
        <Toolbar variant="dense">
          {token !== null ? (
            <div>
              <Button onClick={handleLogOut} color="inherit" to="/login" data-cy="logout-button" component={Link} className="logout-button">
                Log Out
              </Button>
            </div>
          ) : (
            <div>
              <Button className={classes.button} color="inherit" component={Link} to="/login" data-cy="login-button">Log In</Button>
              <Button className={classes.button} color="inherit" component={Link} to="/signUp" data-cy="signUp-button">Sign Up</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarMemotest;