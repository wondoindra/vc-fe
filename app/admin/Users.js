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

function createData(id, date, name, email, status, shipTo, paymentMethod, amount) {
  return { id, date, name, email, status, shipTo, paymentMethod, amount }
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'elvis@mail.com',
    'approved',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'paul@mail.com',
    'pending',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(
    2,
    '16 Mar, 2019',
    'Tom Scholz',
    'tom@mail.com',
    'pending',
    'Boston, MA',
    'MC ⠀•••• 1253',
    100.81
  ),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'michael@mail.com',
    'approved',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'bruce@mail.com',
    'pending',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
]

function preventDefault(event) {
  event.preventDefault()
}

export default function Users() {
  const [users, setUsers] = useState([])

  const fetchUsers = async() => {
    const response = await adminApi.getUsers()
    console.log(response)
    setUsers(response.data)
    console.log(response)
  }

  const approveUser = async(id) => {
    const response = await adminApi.verifyUser(id)
    if (response.ok) fetchUsers()
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
                {row.status === 'PENDING' && (
                  <Button variant='contained' color='success' onClick={() => approveUser(row.id)}>
                    APPROVE
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}