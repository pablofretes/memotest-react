import React from 'react';
import pokeball from '../utils/pokeimages/pokeball.png';
import { formatCounter } from '../utils/helper_functions';
import ReplayModal from '../components/ReplayModal';

const Memotest = ({ images, handleClicks, clickedBlocks, paired, reset, counter, turn, open, setOpen }) => {

    return (
        <div>
            {console.log(paired)}
            <ReplayModal open={open} setOpen={setOpen} reset={reset}/>
            <div >{formatCounter(Math.floor(counter/60))}:{formatCounter(counter%60)}</div>
            <div>Turn: {turn}</div>
            <div className='img-wrapper'>
                {images.map(i => (
                <div onClick={() => handleClicks(i.key)} className={`img-container ${paired.includes(i.name) ? 'disabled' : null}`} key={i.key}>
                    <img className='img' src={clickedBlocks.includes(i.key) || paired.includes(i.name) ? i.img : pokeball} alt={`${i.name}'s sprite`}/>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Memotest;