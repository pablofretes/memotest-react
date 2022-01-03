import React from 'react';
import { makeStyles } from '@material-ui/core';
import loading from '../utils/pokeimages/loading-transparent.gif';

const useStyles = makeStyles(() => ({
    parent: {
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
    },
    gif: {
        height: 50,
        width: 50,
        margin: 'auto',
    }
}))

const Loading = () => {
    const classes = useStyles();
    return(
        <div className={classes.parent}>
            <img className={classes.gif} src={loading} alt="Loading gif" data-cy="loading-gif"/>
        </div>
    );
};

export default Loading;