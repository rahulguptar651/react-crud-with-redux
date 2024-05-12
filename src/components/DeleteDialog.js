import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../redux/tableSlice';

export default function DeleteDialog({ open, handleClose, id }) {

  const dispatch = useDispatch()

  const deleted = () => {
    dispatch(deleteUser(id))
    handleClose();
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user ?
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant='outlined' type="submit" color="primary" onClick={deleted}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
