import React from 'react';
import { Box, Typography, Modal, Button } from '@material-ui/core';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 200,
  width: 'auto',
  bgcolor: '#666666',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ReplayModal = ({ open, setOpen, reset }) => {
    const handleClose = () => setOpen(false);

    return(
        <div>
            <Modal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h2" component="h2" align="center">
                        You Win! Do You Want To Play Again?
                    </Typography>
                    <Typography variant="button" align="center" color="primary">
                        <Button onClick={reset}>Play</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ReplayModal;