import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core'
import { ICart } from '../../interfaces';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@mui/system';
import useStyles from './styles';


interface ICartDetail{
    cart: ICart;
    onCheckOut: Function;
    EmptyCart: Function;
}

function Cart(cartDetail:ICartDetail) {
    const styles = makeStyles((theme : Theme)=>({
        toolbar: theme.mixins.toolbar,
        title: {
            marginTop: '5%',
        },
        emptyButton: {
            minWidth: '150px',
            [theme.breakpoints.down('xs')]: {
            marginBottom: '5px',
            },
            [theme.breakpoints.up('xs')]: {
            marginRight: '20px',
            },
        },
        checkoutButton: {
            minWidth: '150px',
        },
        link: {
            textDecoration: 'none',
        },
        cardDetails: {
            display: 'flex',
            marginTop: '10%',
            width: '100%',
            justifyContent: 'space-between',
        },
    }))();

  const isEmpty = !cartDetail.cart.line_items.length;
  
  const EmptyCart = () => (
      <Typography variant="subtitle1"> Your cart is empty </Typography>
  )

  const FilledCart = () => (
      <>
        <Grid container spacing={3}>
            {cartDetail.cart.line_items.map((item)=>(
                <Grid item xs = {12} sm = {4} key = {item.id} > 
                    <div> {item.name} </div>
                </Grid>
            ))}
        </Grid>
        <div className={styles.cardDetails}>
            <Typography variant="h4">
                Subtotal: {cartDetail.cart.subtotal.formatted_with_symbol}
            </Typography>
            <CartButtons />
        </div>
      </>
  )

  const CartButtons = () => (
    <div>
        <Button onClick={()=> {}} className={styles.emptyButton} size="large" type="button" variant="contained" color="secondary">
            Empty Cart
        </Button>
        <Button onClick={()=> {}}className={styles.checkoutButton} size="large" type="button" variant="contained" color="primary">
            Checkout
        </Button>
    </div>
  )

  if(!cartDetail.cart.line_items) return (<> cart not found please refresh your cart </>);

  return (
    <Container>
        <Typography className={styles.title}>
            Your shopping cart
        </Typography>
        {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart