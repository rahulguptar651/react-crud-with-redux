import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import AddEditDialog from "./AddEditModal"
import { Box, Button } from '@mui/material';
import DeleteDialog from './DeleteDialog';


export default function UserTable() {
  const userList = useSelector((state) => state.users?.users)

  const [openDialog, setOpenDialog] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  return (
    <TableContainer style={{ padding: '20px' }} component={Paper}>
      <Box>
        <Button variant='contained' onClick={() => { setOpenDialog(true); setSelectedUser(null) }}>Add User</Button>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{user.id}</TableCell>
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address.city} &nbsp; ({user.address.zipcode})</TableCell>
              <TableCell>
                <div className='flex'>
                  <button variant="outlined" onClick={() => {
                    setSelectedUser(user);
                    setOpenDialog(true)
                  }} style={{ marginRight: '8px' }}>Edit</button>
                  <button variant="outlined" onClick={() => {
                    setSelectedId(user.id)
                    setOpenDeleteDialog(true)

                  }}>Delete</button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {openDialog && (
        <AddEditDialog
          open={openDialog}
          id={selectedId}
          data={selectedUser}
          handleClose={() => {
            setOpenDialog(false);
            setSelectedId(null);
            setSelectedUser(null)
          }}
        />
      )}
      {openDeleteDialog && (
        <DeleteDialog open={openDeleteDialog}
          id={selectedId}
          handleClose={() => {
            setOpenDeleteDialog(false)
            setSelectedId(null);
          }}
        />
      )}
    </TableContainer>
  )
}