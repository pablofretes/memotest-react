import React from 'react';
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
    maxWidth: 800,
		marginTop: 25,
		marginBlock: 20,
		marginRight: 10
  },
	textLeaderboard: {
		fontFamily: 'Cairo',
		fontSize: 20,
		fontWeight: 'bold'
	}
}));

const LeaderboardTable = ({ array, difficulty }) => {
	const classes = useStyles();
  return (
    <div className={classes.root}>
			<p className={classes.textLeaderboard}>{difficulty} Leaderboard</p>
			<TableContainer component={Paper} className={classes.tableContainer}>
			<Table sx={{ minWidth: 320, maxWidth: 800 }} aria-label="simple table" className={classes.paper}>
				<TableHead>
				<TableRow>
					<TableCell >Username</TableCell>
					<TableCell align="right">Turns</TableCell>
					<TableCell align="right">Seconds</TableCell>
				</TableRow>
				</TableHead>
			<TableBody>
				{array.map((score, index) => (
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

export default LeaderboardTable;