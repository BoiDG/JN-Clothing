import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import OrderReview from './OrderReview';
import { IOrder,IShippingInfo } from '../../interfaces';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

interface IPaymentForm{
    checkoutToken?:IOrder;
    nextStep:Function;
    backStep:Function;
    shippingData?:IShippingInfo;
    onCaptureCheckout:Function;
}

const PaymentForm = (paymentInterface:IPaymentForm) => {

  const { checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout } = paymentInterface;
  const handleSubmit = async (event:any, elements:any, stripe:any) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    if (error || !shippingData || !shippingData.data) {
      // console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken?.line_items,
        customer: { firstname: shippingData?.data.firstName, lastName: shippingData?.data.lastName, email: shippingData?.data.email },
        shipping: { name: 'International', street: shippingData?.data.address1, town_city: shippingData?.data.city, county_state: shippingData?.shippingSubdivision, postal_zip_code: shippingData?.data.zip, country: shippingData?.shippingCountry },
        fulfillment: { shipping_method: shippingData?.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      try{
        onCaptureCheckout(checkoutToken?.id, orderData);
      }catch(error){
         
      }
      nextStep();
    }
  };

  return ( checkoutToken ? (
    <>
      <OrderReview checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement />
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={() => backStep()}>Back</Button>
              <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
        )}
        </ElementsConsumer>
      </Elements>
    </>
  ) :(<> Loading... </>));
};

export default PaymentForm;