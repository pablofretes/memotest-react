import React from 'react';
import { LEADERBOARD } from '../queries';
import { useQuery } from '@apollo/client';
import Loading from './Loading';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#ADD8E6',
    },
    tableContainer: {
        marginTop: 50,
        maxWidth: 800,
    }
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
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table sx={{ minWidth: 500, maxWidth: 800 }} aria-label="simple table" className={`leaderboard ${classes.paper}`}>
                    <TableHead>
                        <TableRow>
                            <TableCell >Username</TableCell>
                            <TableCell align="right">Turns</TableCell>
                            <TableCell align="right">Seconds</TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                    {sortedScores.map((score, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {score.user.username}
                            </TableCell>
                            <TableCell align="right">{score.turns}</TableCell>
                            <TableCell align="right">{score.timeCount}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Leaderboard;