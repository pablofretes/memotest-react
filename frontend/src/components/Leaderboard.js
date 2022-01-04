import React from 'react';
import { LEADERBOARD } from '../queries';
import { useQuery } from '@apollo/client';
import Loading from './Loading';

const Leaderboard = () => {
    const result = useQuery(LEADERBOARD);

    if(result.loading){
        return <Loading />;
    };
    console.log(result);
    const scoresArray = result.data.leaderboard;
    console.log(scoresArray);


    let sortedScores = [...scoresArray].sort((a, b) => {
        if(a.turns === b.turns){
            return b.timeCount - a.timeCount;
        };
        return a.turns > b.turns ? 1 : - 1;
    });

    return (
        <div>
            {sortedScores.map(score => {
                return <p>{score.user.username} : {score.turns} turns / {score.timeCount} seconds</p>
            })}
        </div>
    );
};

export default Leaderboard;