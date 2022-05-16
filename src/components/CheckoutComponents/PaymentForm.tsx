import React, { useEffect } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import OrderReview from './OrderReview';
import { IOrder,IShippingInfo } from '../../interfaces';


interface IPaymentForm{
    checkoutToken?:IOrder;
    nextStep:Function;
    backStep:Function;
    shippingData?:IShippingInfo;
    onCaptureCheckout:Function;
}

const PaymentForm = (paymentInterface:IPaymentForm) => {

  const { checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout } = paymentInterface;
  
  
  

  return ( checkoutToken ? (
    <>
      {/* <OrderReview checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
        <ElementsConsumer>{({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={() => backStep()}>Back</Button>
              <Button type="submit" variant="contained" color="primary">
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
        )}</ElementsConsumer> */}

    </>
  ) :(<> Loading... </>));
};

export default PaymentForm;