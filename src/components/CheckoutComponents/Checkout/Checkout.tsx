import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';
import { ICart, IOrder, IShippingInfo } from '../../../interfaces';

const steps = ['Shipping address', 'Payment details'];

interface ICheckOut{
  cart:ICart;
  onCaptureCheckout:Function;
  order:any;
  error:string;
}

const Checkout = (CheckOutDetail:ICheckOut) => {
  const {cart, onCaptureCheckout, order, error} = CheckOutDetail;
  const [checkoutToken, setCheckoutToken] = useState<IOrder>();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState<IShippingInfo>();
  const classes = useStyles();
  const nav = useNavigate();
  const [loading,setLoading] = useState(false);
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => { 
        // buat function kusus karena anonimus function ga bisa async
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

          setCheckoutToken(token);
        } catch {
          if (activeStep !== steps.length) nav('/');
        }
      };

      generateToken();
    }
  }, [activeStep, cart, nav]);

  const saveAddressData = (data:any) => {
    setShippingData(data);
    console.log(shippingData)
    nextStep();
  };

  const timeout = () =>{
    setTimeout(() =>{
    setLoading(true);
    },3000);
  }

  let Confirmation = () => (order?.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) :(loading) ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase!</Typography>
        <Divider className={classes.divider} />
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

  const Form = () => (activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} saveAddressData={saveAddressData} />
    : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;