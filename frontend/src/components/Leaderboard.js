import React from 'react';
import { LEADERBOARD } from '../queries';
import { useQuery } from '@apollo/client';
import Loading from './Loading';
import LeaderboardTable from './LeaderboardTable';
import { makeStyles } from '@material-ui/core';
import { sortingFunction } from '../utils/helper_functions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
}));

const Leaderboard = () => {
  const classes = useStyles();
  const result = useQuery(LEADERBOARD);

  if(result.loading){
    return <Loading />;
  };

  const scoresArray = result.data.leaderboard;
  const easy = [...scoresArray].filter(item => item.difficulty === 'easy').slice(0, 9);
  const normal = [...scoresArray].filter(item => item.difficulty === 'normal').slice(0, 9);
  const hard = [...scoresArray].filter(item => item.difficulty === 'hard').slice(0, 9);
  /*THIS COPIES THE SCORES (because its read only) AND SORTS IT. IF THE SCORES HAVE THE SAME AMOUNT OF TURNS
  THE RANK IS DECIDED BY THE AMOUNT OF SECONDS*/

  const easyScores = sortingFunction(easy);
	const normalScores = sortingFunction(normal);
	const hardScores = sortingFunction(hard);

  return (
    <div className={classes.root}>
			<LeaderboardTable difficulty='Easy' array={easyScores}/>
			<LeaderboardTable difficulty='Normal' array={normalScores}/>
			<LeaderboardTable difficulty='Hard' array={hardScores}/>
    </div>
  );
};

export default Leaderboard;