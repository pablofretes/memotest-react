import React from 'react';
import pokeball from '../../utils/pokeimages/pokeball.png';
import { formatCounter } from '../../utils/helper_functions';
import ReplayModal from '../../components/ReplayModal';
import ReactCardFlip from 'react-card-flip';
import './memotest.css';

const Memotest = ({ reset, images, handleClicks, clickedBlocks, turn, paired, counter, open, setOpen, disabled, show, difficulty }) => {
    return (
        <div className="memotest-root">
            <ReplayModal open={open} setOpen={setOpen} reset={reset}/>
            <div className='counters-container'>
                <div className="text counters">{formatCounter(Math.floor(counter/60))}:{formatCounter(counter%60)}</div>
                <div className="text counters">Turn: {turn}</div>
            </div>
            <div className={difficulty === 'hard' ? 'img-wrapper' : difficulty === 'normal' ? 'img-wrapper-normal' : 'img-wrapper-easy'}>
                {images.map(i => (
                <ReactCardFlip isFlipped={clickedBlocks.includes(i.key) || paired.includes(i.name) || show ? false : true} key={i.key}>
                    <div 
											onClick={() => handleClicks(i.key)} className={`img-container ${paired.includes(i.name) || show || disabled ? 'disabled' : null}`}
											style={{ cursor: `${disabled ? null : 'pointer'}`}}>
                        <img className='img' src={i.img} data-cy={`${i.key}-img`} alt={`${i.name}'s sprite`}/>
                    </div>
                    <div 
											onClick={() => handleClicks(i.key)} className={`img-container ${paired.includes(i.name) || show || disabled ? 'disabled' : null}`}
											style={{ cursor: `${disabled ? null : 'pointer'}`}}>
                        <img className='img useless' name={`${i.key}`} data-cy={`${i.key}-container`} src={pokeball} alt={`${i.name}'s sprite`}/>
                    </div>
                </ReactCardFlip>
                ))}
            </div>
        </div>
    );
};

export default Memotest;