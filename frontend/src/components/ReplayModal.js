import React from 'react';
import { Box, Typography, Modal } from '@material-ui/core';

const ReplayModal = ({ open, setOpen, reset }) => {
    const handleClose = () => setOpen(false);

    return(
        <div>
            <Modal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" open={open} onClose={handleClose} data-cy="replay-modal">
                <Box className="styleBox">
                    <Typography id="modal-modal-title" align="center" className="text-modal">
                        You Win! Do You Want To Play Again?
                    </Typography>
                    <br></br>
                    <Typography variant="button" align="center" color="primary">
                        <button onClick={reset} align="center" className="play-again-button">Play</button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ReplayModal;