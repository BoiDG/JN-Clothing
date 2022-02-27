import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { IOrder,IProductItem } from '../../interfaces';

interface IOrderReview{
    checkoutToken:IOrder;
}

const OrderReview = (OrderReviewDetail:IOrderReview) => {
    const checkoutToken = OrderReviewDetail.checkoutToken;
    return( checkoutToken.line_items ? (
  <>
    <Typography variant="h6" gutterBottom>Order summary</Typography>
    <List disablePadding>
      {checkoutToken.line_items.map((product:IProductItem) => (
        <ListItem style={{ padding: '10px 0' }} key={product.name}>
          <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
          <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: '10px 0' }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          {checkoutToken.live.subtotal.formatted_with_symbol}
        </Typography> 
      </ListItem>
    </List>
  </>
):(
<>
Loading...
</>
))};

export default OrderReview;