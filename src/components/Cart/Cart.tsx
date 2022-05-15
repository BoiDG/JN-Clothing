import React, { useEffect, useState } from 'react'
import {Container, Typography, Button, Grid, CircularProgress} from '@material-ui/core'
import { ICart } from '../../interfaces';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';


interface ICartDetail{
    cart: ICart;
    EmptyCart: Function;
    onUpdateQty:Function;
    onRemoveFromCart:Function;
    loading:Boolean;
}

function Cart(cartDetail:ICartDetail) {
    const styles = useStyles();
    const [cartLength,setcartLength] = useState(cartDetail.cart.line_items.length);
    

    const EmptyCart = () => (
        <Typography variant="subtitle1"> Your cart is empty </Typography>
    )
    // useEffect(() => {
    //     timeout()
    //   }, []);
  const FilledCart = () => (
      <>
        <Grid container spacing={3}>
            {cartDetail.cart.line_items.map((item)=> (
                <Grid item xs = {12} sm = {4} key = {item.id} > 
                    <CartItem product={item} onUpdateQty={cartDetail.onUpdateQty} onRemoveFromCart={cartDetail.onRemoveFromCart} />
                </Grid>
            ))}
        </Grid>
        <div className={styles.cardDetails}>
            <Typography variant="h6" style={{fontFamily: "Montserrat"}}>
                Subtotal: {cartDetail.cart.subtotal.formatted_with_symbol ? cartDetail.cart.subtotal.formatted_with_symbol : ''}
            </Typography>
            <CartButtons />
        </div>
      </>
  )

//   const timeout = () =>{
//     setTimeout(() =>{
//     setLoading(true);
//     },3000);
//   }

  const CartButtons = () => (
    <div>
        <Button onClick={()=> cartDetail.EmptyCart()} className={styles.emptyButton} size="large" type="button" variant="contained" color="secondary">
            Empty Cart
        </Button>
        <Button component={Link} to="/checkout" className={styles.checkoutButton} size="large" type="button" variant="contained" color="primary">
            Checkout
        </Button>
    </div>
  )

//   if(!cartDetail.cart.line_items) return (<> Loading... </>);
//     console.log(cartDetail.cart)
  return (!cartDetail.loading ? (
    <Container>
        <Typography variant="h4" className={styles.title}>
            Your shopping cart
        </Typography>
        {!cartLength ? <EmptyCart /> : <FilledCart />}
    </Container>
  ) : (
    <div style={{marginTop: "7em"}} className={styles.spinner}>
      <CircularProgress />
    </div>
  ))
}

export default Cart