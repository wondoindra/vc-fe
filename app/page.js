'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from "@mui/material/Typography"
import Toolbar from "@mui/material/Toolbar"

import AppBar from "./components/Appbar"
import ProductCard from "./components/ProductCard"

import Product from "./data/products"

import { useUserContext } from '../context/context'

export default function Home() {

  const router = useRouter()
  const { user, setUser } = useUserContext()

  useEffect(() => {
    setUser('index')
  })

  useEffect(() => {
    console.log(user)
  }, [user])

  const navigateLogin = () => {
    router.push("/login")
  }

  return (
    <section className="bg-white">
      <AppBar position="relative">
        <Toolbar className='flex justify-between'>
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
          {!user.loggedIn && (
            <div
              onClick={navigateLogin}
              className='cursor-pointer'
            >
              <Typography variant="h6" color="inherit" noWrap>
                Login
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Card sx={{ height: '100%', mb: 4, cursor: 'pointer' }}>
            <CardMedia
              sx={{ height: 500 }}
              component="img"
              image={Product.productBanner.source}
            />
          </Card>
          <Typography variant='h4' color="black" sx={{ fontWeight: 'bold', mb: 2 }}>
            Promo hari ini
          </Typography>
          <Grid container spacing={4}>
            {Product.products.map((product, index) => (
              <ProductCard key={`product${index}`} product={product} />
            ))}
          </Grid>
        </Container>
      </main>
    </section>
  )
}
