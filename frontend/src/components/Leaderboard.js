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
    const scoresArray = result.data;
    console.log(scoresArray);

    return (
        <div>
        </div>
    );
};

export default Leaderboard;