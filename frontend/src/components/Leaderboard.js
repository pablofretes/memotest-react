import React from 'react';
import { LEADERBOARD } from '../queries';
import { useQuery } from '@apollo/client';
import Loading from './Loading';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 100,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#ADD8E6',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
}));

const Leaderboard = () => {
    const classes = useStyles();
    const result = useQuery(LEADERBOARD);

    if(result.loading){
        return <Loading />;
    };

    const scoresArray = result.data.leaderboard;

    /*THIS COPIES THE SCORES (because its read only) AND SORTS IT. IF THE SCORES HAVE THE SAME AMOUNT OF TURNS
    THE RANK IS DECIDED BY THE AMOUNT OF SECONDS*/

    let sortedScores = [...scoresArray].sort((a, b) => {
        if(a.turns === b.turns){
            return a.timeCount - b.timeCount;
        };
        return a.turns > b.turns ? 1 : - 1;
    }).slice(0, 9);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <p className='text'>TOP 10</p>
                {sortedScores.map((score, index) => {
                    return <p key={index}>{score.user.username}  -  {score.turns} turns | | | {score.timeCount} seconds</p>
                })}
            </Paper>
        </div>
    );
};

export default Leaderboard;