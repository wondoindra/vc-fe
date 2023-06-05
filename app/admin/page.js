'use client'
import { useState, useEffect } from "react"

import { useRouter } from 'next/navigation'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import PeopleIcon from '@mui/icons-material/People'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import Users from './Users'
import { useUserContext } from '../../context/context'

import Drawer from '../components/Drawer'
import AppBar from "../components/Appbar"

const Admin = () => {
  const router = useRouter()
  const { user, setUser } = useUserContext()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  useEffect(() => {
    setUser({ ...user, mode: 'ADMIN' })

    if (!user.loggedIn) {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <section className="h-screen bg-white">
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </section>
    )
  }

  const handleLogout = () => {
    window.location.href = '/'
  }

  return (
    <section className="h-screen bg-white">
      <Box sx={{ display: 'flex' }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{ pr: '24px' }}
            className="flex justify-between"
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <div
              onClick={handleLogout}
              className='cursor-pointer'
            >
              <Typography variant="h6" color="inherit" noWrap>
                Logout
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Users />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </section>
  )
}

export default Admin