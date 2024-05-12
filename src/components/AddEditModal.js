

// Importing required React components and hooks from 'react' and 'formik'.
import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Importing Material-UI components for styling the dialog.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// Importing Redux hooks for accessing the store and dispatching actions.
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateUser } from '../redux/tableSlice';

// Defining the validation schema for form fields using Yup.
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  city: Yup.string().required('City is required'),
  zipcode: Yup.string().required('Zipcode is required'),
});

// Functional component AddEditDialog for adding or editing user details.
export default function AddEditDialog({ open, handleClose, id, data }) {
  // Logging the received data props.
  console.log('data:', data);

  // Accessing user list from Redux store.
  const userList = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  // Initializing formik form with initial values and form validation schema.
  const formik = useFormik({
    initialValues: {
      username: `${data ? data?.username : ''}`,
      email: `${data ? data?.email : ''}`,
      phone: `${data ? data?.phone : ''}`,
      city: `${data ? data?.address?.city : ''}`,
      zipcode: `${data ? data?.address?.zipcode : ''}`,
    },
    validationSchema,
    // onSubmit function to handle form submission.
    onSubmit: (values) => {
      // Creating the final user object to be dispatched.
      const finalUpdate = {
        username: values.username,
        email: values.email,
        phone: values.phone,
        address: { city: values.city, zipcode: values.zipcode },
        id: data ? data?.id : userList.length + 1
      };

      // Dispatching addUser or updateUser action based on whether data is present.
      {
        !data ? dispatch(addUser(finalUpdate)) : dispatch(updateUser(finalUpdate))
      }

      // Closing the dialog after form submission.
      handleClose();
    },
  });

  // JSX to render the dialog component.
  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{data ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          {/* Form for adding/editing user details */}
          <form style={{ paddingTop: '20px' }} onSubmit={formik.handleSubmit}>
            <Box>
              {/* Text fields for username, email, phone number, city, and zipcode */}
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="zipcode"
                name="zipcode"
                label="Zipcode"
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                helperText={formik.touched.zipcode && formik.errors.zipcode}
                sx={{ mb: 2 }}
              />
            </Box>
            {/* Dialog actions for closing the dialog or submitting the form */}
            <DialogActions>
              <Button variant='outlined' onClick={handleClose}>Close</Button>
              <Button variant='outlined' type="submit" color="primary">{data ? 'Update' : 'Save'}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
