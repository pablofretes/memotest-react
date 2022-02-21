import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = ({ setDifficulty, reset, difficulty }) => {
  return (
		<div className='home-container'>
			<div className='button-container'>
							<p className='text-home'>Please pick a Level</p>
							<button className='difficulty-button' onClick={() => setDifficulty('easy')}>Easy</button>
							<button className='difficulty-button' onClick={() => setDifficulty('normal')}>Normal</button>
							<button className='difficulty-button' onClick={() => setDifficulty('hard')}>Hard</button>
							{difficulty === '' ? null : <Link to='/memotest' style={{ textDecoration: 'none' } }><button className='play-again-button' onClick={reset}>Play!</button></Link>}
			</div>
		</div>
  );
};

export default Home;