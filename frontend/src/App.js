import React, { useState } from 'react';
import './App.css';
import AppBarMemotest from './components/AppBar';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import useMemotest from './useMemotest';
import Leaderboard from './components/Leaderboard';
import Notification from './components/Notification';

const App = () => {
  const [notification, setNotification] = useState({});

  const { images, handleClicks, clickedBlocks, paired, turn, open, setOpen, token, setToken, counter, reset, disabled, show } = useMemotest();

  return (
    <div>
      <Notification notification={notification}/>
      <AppBarMemotest token={token} setToken={setToken}/>
      <Routes>
        <Route path='/' element={<Home
          disabled={disabled}
          images={images}
          handleClicks={handleClicks}
          clickedBlocks={clickedBlocks}
          paired={paired}
          turn={turn}
          reset={reset}
          counter={counter}
          open={open}
          setOpen={setOpen}
          show={show}
        />}/>
        <Route path='/leaderboard' element={<Leaderboard />}/>
        <Route path='/login' element={<Login setToken={setToken} setNotification={setNotification} />}/>
        <Route path='/signUp' element={<SignUp setNotification={setNotification} />}/>
      </Routes>
    </div>
  );
};

export default App;