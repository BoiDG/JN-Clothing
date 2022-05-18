import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';
import { IOrder, IShippingMethods,IShippingInfo } from '../../interfaces';

interface IAddressForm{
    checkoutToken:IOrder;
    saveAddressData:Function;
}

const AddressForm = (checkoutDetail:IAddressForm|any) => {



  const axios = require('axios');
  const { checkoutToken, saveAddressData } = checkoutDetail;

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState<IShippingMethods[]>([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();
  const register = methods.register;

  const fetchShippingCountries = async (checkoutTokenId:string) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (checkoutTokenId:string,countryCode:string) => {
    const { subdivisions } = await commerce.services.localeListShippingSubdivisions(checkoutTokenId,countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId:string, country:string, stateProvince:string | any) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
    console.log(shippingCountries)
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'; 
    //change this according to your client-key
    const myMidtransClientKey = 'SB-Mid-client-JlCnybacKB5ddA_l'; 
   
    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
   
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    }
    
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(checkoutToken.id,shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);


  const handleSubmit = async (data:IShippingInfo) => {
    // event.preventDefault();
    console.log('tes')
    // if (!stripe || !elements) return;

    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    // if (error || !shippingData || !shippingData.data) {
    //   // console.log('[error]', error);
    // } else {
    //   const orderData = {
    //     line_items: checkoutToken?.line_items,
    //     customer: { firstname: shippingData?.data.firstName, lastName: shippingData?.data.lastName, email: shippingData?.data.email },
    //     shipping: { name: 'International', street: shippingData?.data.address1, town_city: shippingData?.data.city, county_state: shippingData?.shippingSubdivision, postal_zip_code: shippingData?.data.zip, country: shippingData?.shippingCountry },
    //     fulfillment: { shipping_method: shippingData?.shippingOption },
    //     payment: {
    //       gateway: 'stripe',
    //       stripe: {
    //         payment_method_id: paymentMethod.id,
    //       },
    //     },
    //   };
    

    let parameter = {
      "transaction_details": {
          "order_id": checkoutToken?.id,
          "gross_amount": checkoutToken?.live.subtotal.raw
      },
      "credit_card":{
          "secure" : true
      },
      "customer_details": {
          "first_name": data.data.firstName,
          "last_name": data.data.lastName,
          "email": data.data.email,
          "phone": data.data.phone
      }
    };
   
    console.log(parameter)
      try{
        let url='https://indonesia-covid-news-article.herokuapp.com/order';
        const message = await axios.post(url,{
          parameter
        })
        window?.snap?.pay(message.data.token)
        // onCaptureCheckout(checkoutToken?.id, orderData);
      }catch(error){
         
      }
      // nextStep();
    }
  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit((data:any) => handleSubmit({ data:{...data}, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Grid container spacing={3}>
            <FormInput {...register("firstName")} required name="firstName" label="First name" />
            <FormInput {...register("lastName")} required name="lastName" label="Last name" />
            <FormInput {...register("address1")} required name="address1" label="Address line 1" />
            <FormInput {...register("email")} required name="email" label="Email" />
            <FormInput {...register("phone")} required name="phone" label="Phone" />
            <FormInput {...register("city")} required name="city" label="City" />
            <FormInput {...register("zip")} required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e:any) => setShippingCountry(e.target.value)}>
                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e:any) => setShippingSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e:any) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
        </FormProvider>
    </>
  );
};

export default AddressForm;