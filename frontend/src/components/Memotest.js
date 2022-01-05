import React from 'react';
import pokeball from '../utils/pokeimages/pokeball.png';
import { formatCounter } from '../utils/helper_functions';
import ReplayModal from '../components/ReplayModal';
import { makeStyles } from '@material-ui/core';
import ReactCardFlip from 'react-card-flip';

const useStyles = makeStyles(({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        flexGrow: 1,
        justifyItems: 'center',
    },
    counters: {
        width: 120,
        borderRadius: 25,
        height: 25,
        textAlign: 'center',
        backgroundColor: '#ADD8E6',
        margin: 5,
        justifyContent: 'center'
    }
}));

const Memotest = ({ images, handleClicks, clickedBlocks, paired, reset, counter, turn, open, setOpen }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ReplayModal open={open} setOpen={setOpen} reset={reset}/>
            <div className={classes.container}>
                <div className={`text ${classes.counters}`}>{formatCounter(Math.floor(counter/60))}:{formatCounter(counter%60)}</div>
                <div className={`text ${classes.counters}`}>Turn: {turn}</div>
            </div>
            <div className='img-wrapper'>
                {images.map(i => (
                <ReactCardFlip isFlipped={clickedBlocks.includes(i.key) || paired.includes(i.name) ? false : true} key={i.key}>
                    <div onClick={() => handleClicks(i.key)} className={`img-container ${paired.includes(i.name) ? 'disabled' : null}`}>
                        <img className='img' src={i.img} alt={`${i.name}'s sprite`}/>
                    </div>
                    <div onClick={() => handleClicks(i.key)} className={`img-container ${paired.includes(i.name) ? 'disabled' : null}`}>
                        <img className='img' src={pokeball} alt={`${i.name}'s sprite`}/>
                    </div>
                </ReactCardFlip>
                ))}
            </div>
        </div>
    );
};

export default Memotest;