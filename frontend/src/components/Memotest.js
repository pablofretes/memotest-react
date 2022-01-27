import React from 'react';
import pokeball from '../utils/pokeimages/pokeball.png';
import { formatCounter } from '../utils/helper_functions';
import ReplayModal from '../components/ReplayModal';
import ReactCardFlip from 'react-card-flip';

const Memotest = ({ images, handleClicks, clickedBlocks, paired, reset, counter, turn, open, setOpen, disabled }) => {
    return (
        <div className="memotest-root">
            <ReplayModal open={open} setOpen={setOpen} reset={reset}/>
            <div className='counters-container'>
                <div className="text counters">{formatCounter(Math.floor(counter/60))}:{formatCounter(counter%60)}</div>
                <div className="text counters">Turn: {turn}</div>
            </div>
            <div className='img-wrapper'>
                {images.map(i => (
                <ReactCardFlip isFlipped={clickedBlocks.includes(i.key) || paired.includes(i.name) ? false : true} key={i.key}>
                    <div onClick={() => handleClicks(i.key)} className={`img-container ${paired.includes(i.name) || disabled ? 'disabled' : null}`}>
                        <img className='img' src={i.img} data-cy={`${i.key}-img`} alt={`${i.name}'s sprite`}/>
                    </div>
                    <div onClick={() => handleClicks(i.key)} className={`img-container ${paired.includes(i.name) || disabled ? 'disabled' : null}`}>
                        <img className='img useless' name={`${i.key}`} data-cy={`${i.key}-container`} src={pokeball} alt={`${i.name}'s sprite`}/>
                    </div>
                </ReactCardFlip>
                ))}
            </div>
        </div>
    );
};

export default Memotest;