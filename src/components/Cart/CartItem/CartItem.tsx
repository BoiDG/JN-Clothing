import React from 'react'
import { Typography, Button, Card, CardActions,CardContent, CardMedia, StylesProvider} from '@material-ui/core'
import { IProductItem } from '../../../interfaces'
import useStyles from './styles';


interface ICartItem{
    product : IProductItem;
    onUpdateQty : Function;
    onRemoveFromCart : Function;
}

function CartItem(cartItem:ICartItem) {

    const styles = useStyles();

    const handleUpdateCartQty = (lineItemId:string, newQuantity:number) => cartItem.onUpdateQty(lineItemId, newQuantity);
  
    const handleRemoveFromCart = (lineItemId:string) => cartItem.onRemoveFromCart(lineItemId);
  
    return (
    <Card>
        <CardMedia image={cartItem.product.image.url} className={styles.media} />
      <CardContent className={styles.cardContent}>
        <Typography variant="h5">{cartItem.product.name}</Typography>
        <Typography variant="h6">{cartItem.product.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={styles.cartActions}>
        <div className={styles.buttons}>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(cartItem.product.id, cartItem.product.quantity - 1)}>-</Button>
          <Typography>&nbsp;{cartItem.product.quantity}&nbsp;</Typography>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(cartItem.product.id, cartItem.product.quantity + 1)}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(cartItem.product.id)}>Remove</Button>
      </CardActions>
    </Card>
  )
}

export default CartItem