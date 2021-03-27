import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
    const { open, handleClose, textBody, textTitle } = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose.bind(this, false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{textTitle}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                { textBody }
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose.bind(this, false)} color="primary">
                Cancelar
            </Button>
            <Button onClick={handleClose.bind(this, true)} color="primary" autoFocus>
                Aceptar
            </Button>
            </DialogActions>
        </Dialog>
    );
}