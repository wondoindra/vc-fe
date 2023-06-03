import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from "@mui/material/Typography"

const ProductCard = ({ product, key }) => {
  return (
    <Grid item key={key} xs={12} sm={6} md={3}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      >
        <CardMedia
          component="div"
          sx={{ pt: '80.25%' }}
          image={product.source}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="subtitle1" sx={{ lineHeight: 'normal' }}>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 'normal' }}>
            {product.price}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ProductCard