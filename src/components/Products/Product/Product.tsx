import React, { useState } from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons'
import { IProductItem } from '../../../interfaces';
import useStyles from './styles';
import { Link } from 'react-router-dom';

interface IProduct{
  product : IProductItem;
  onAddToCart : Function;
}
function Product(item:IProduct) {
  const [quantity,setQuantity] = useState(1);
  const styles = useStyles();

  return (
    <Card className={styles.root} >
      <CardMedia component={Link} to={`/product/${item.product.id}`} className={styles.media} image ={item.product.image.url} title={item.product.name} />
       <CardContent>
        <div className = {styles.cardContent}>
          <Typography variant='h4' >
            {item.product.name} 
          </Typography>
          {/* <Typography variant='h6' >
            {item.product.price.formatted_with_symbol} 
          </Typography> */}
        </div> 
        <div className = {styles.cardContentPrice}>
        <Typography variant='h6' >
            {item.product.price.formatted_with_symbol} 
          </Typography>
        </div>
        {/* <Typography variant='subtitle1' className = {styles.cardDesc} >
            {item.product.description.replace(/<[^>]*>?/gm, '')} 
        </Typography> */}
        
      </CardContent> 
      
      {/* <CardActions disableSpacing className={styles.cardActions}>
      <input className = {styles.cardDesc + " " + styles.inputQty} type="number" onChange={(e)=> {
          e.target.value = (e.target.value < '0') ? '0' : e.target.value;
          setQuantity(parseInt(e.target.value));
      }} value = {quantity}/>
        <IconButton aria-label="Add to Cart" onClick={()=> item.onAddToCart(item.product.id, quantity)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions> */}
    </Card>
  )
}

export default Product