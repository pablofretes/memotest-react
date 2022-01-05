import React from 'react';
import { Box, Typography, Modal, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({
    styleBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 300,
        width: 'auto',
        backgroundColor: '#666666',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 25,
        display: 'flex',
        justifyContents: 'center',
        alignItems: 'center',
    },
    styleButton: {
        backgroundColor: '#189ab4',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 8,
        height: 50,
        width: 100,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10
    },
}));

const ReplayModal = ({ open, setOpen, reset }) => {
    const classes = useStyles();
    const handleClose = () => setOpen(false);

    return(
        <div>
            <Modal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" open={open} onClose={handleClose}>
                <Box className={classes.styleBox}>
                    <Typography id="modal-modal-title" variant="h2" component="h2" align="center">
                        You Win! Do You Want To Play Again?
                    </Typography>
                    <Typography variant="button" align="center" color="primary">
                        <Button onClick={reset} align="center" className={classes.styleButton}>Play</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ReplayModal;