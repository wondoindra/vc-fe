import * as React from 'react'
import { useState, useEffect } from "react"
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import adminApi from '../api/admin'

export default function Users() {
  const [users, setUsers] = useState([])

  const fetchUsers = async() => {
    const response = await adminApi.getUsers()
    setUsers(response.data)
  }

  const approveUser = async(id) => {
    const response = await adminApi.verifyUser(id)
    if (response.status === 200) fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <React.Fragment>
       <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Users
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Registered at</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">
                <Button
                  variant='contained'
                  color='success'
                  onClick={() => approveUser(row.id)}
                  disabled={row.status === 'VERIFIED'}
                  className='bg-[#1b5e20]'
                >
                  {row.status === 'VERIFIED' ? 'VERIFIED' : 'APPROVE'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}