'use client'

import Link from 'next/link'

import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from "@mui/material/Typography"
import Toolbar from "@mui/material/Toolbar"

import AppBar from "./components/Appbar"
import ProductCard from "./components/ProductCard"

import Product from "./data/products"

export default function Home() {
  return (
    <section className="bg-white">
      <AppBar position="relative">
        <Toolbar className='flex justify-between'>
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
          <Link href="/login">
            <Typography variant="h6" color="inherit" noWrap>
              Login
            </Typography>
          </Link>
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
