import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        flexGrow: 1,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#ADD8E6',
        height: 150,
        alignSelf: 'center',
        width: width,
        borderRadius: width/2,
        marginTop: 120
    },
}));

const width = 250;

const Home = ({ reset }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button onClick={reset} className={classes.button}><Link to='/memotest' style={{ textDecoration: 'none' }}>PLAY</Link></Button>
        </div>
    );
};

export default Home;