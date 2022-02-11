import React from 'react';
import { Box, Typography, Modal, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    text: {
        fontSize: 20,
        fontFamily: 'Cairo',
        fontWeight: 'bolder',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10
    }
}))

const ReplayModal = ({ open, setOpen, reset }) => {
    const classes = useStyles();
    const handleClose = () => setOpen(false);

    return(
        <div>
            <Modal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" open={open} onClose={handleClose} data-cy="replay-modal">
                <Box className="style-box">
                    <Typography id="modal-modal-title" align="center" className={classes.text}>
                        You Win! Do You Want To Play Again?
                    </Typography>
                    <button onClick={reset} align="center" className="play-again-button">Play</button>
                </Box>
            </Modal>
        </div>
    );
};

export default ReplayModal;