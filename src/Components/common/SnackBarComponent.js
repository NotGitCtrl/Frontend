import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function SnackBarComponent({status,message, open, handleClose}) {
  
  return (
    <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <MuiAlert variant="filled" onClose={handleClose} severity={status}>
          {message}
        </MuiAlert>
      </Snackbar>
  );
}
