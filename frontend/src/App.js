import React from 'react';
import './App.css';
import AppBarMemotest from './components/AppBar';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Memotest from './components/Memotest';
import Home from './components/Home';
import useMemotest from './useMemotest';
import Leaderboard from './components/Leaderboard';

const App = () => {

  const { images, handleClicks, clickedBlocks, paired, turn, open, setOpen, token, setToken, counter, reset } = useMemotest();

  return (
    <div>
      <AppBarMemotest token={token} setToken={setToken}/>
      <Routes>
        <Route path='/' element={<Home reset={reset} />}/>
        <Route path='/leaderboard' element={<Leaderboard />}/>
        <Route path='/memotest' element={<Memotest 
          images={images}
          handleClicks={handleClicks}
          clickedBlocks={clickedBlocks}
          paired={paired}
          turn={turn}
          reset={reset}
          counter={counter}
          open={open}
          setOpen={setOpen}
          />}/>
        <Route path='/login' element={<Login setToken={setToken}/>}/>
        <Route path='/signUp' element={<SignUp />}/>
      </Routes>
    </div>
  );
};

export default App;