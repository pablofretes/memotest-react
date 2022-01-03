import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Home = ({ reset }) => {
    return (
        <Button onClick={reset}><Link to='/memotest'>PLAY</Link></Button>
    );
};

export default Home;