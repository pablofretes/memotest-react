import React from 'react';
import Memotest from './Memotest';

const Home = ({ reset, images, handleClicks, clickedBlocks, turn, paired, counter, open, setOpen, disabled, show }) => {
    return (
        <div>
            <button className='play-again-button' onClick={reset}>Play!</button>
            <Memotest
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
            />
        </div>
    );
};

export default Home;